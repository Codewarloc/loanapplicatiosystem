from __future__ import annotations

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score, precision_score, recall_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

from preprocessing import FEATURE_COLUMNS, build_preprocessor, clean_data, engineer_features, get_target, validate_columns


ROOT = Path(__file__).resolve().parent
DATASET_PATH = ROOT / 'dataset' / 'loans.csv'
MODEL_PATH = ROOT / 'models' / 'loan_risk_classifier.pkl'
RANDOM_STATE = 42


def score_model(model: Pipeline, X_test: pd.DataFrame, y_test: pd.Series) -> dict:
    predictions = model.predict(X_test)
    probabilities = model.predict_proba(X_test)
    classes = list(model.classes_)
    high_index = classes.index('HIGH')
    metrics = {
        'accuracy': float(accuracy_score(y_test, predictions)),
        'precision_macro': float(precision_score(y_test, predictions, average='macro', zero_division=0)),
        'recall_macro': float(recall_score(y_test, predictions, average='macro', zero_division=0)),
        'f1_macro': float(f1_score(y_test, predictions, average='macro', zero_division=0)),
        'high_risk_recall': float(recall_score(y_test, predictions, labels=['HIGH'], average='macro', zero_division=0)),
        'confusion_matrix': confusion_matrix(y_test, predictions, labels=['LOW', 'MEDIUM', 'HIGH']).tolist(),
        'classification_report': classification_report(y_test, predictions, labels=['LOW', 'MEDIUM', 'HIGH'], zero_division=0, output_dict=True),
    }
    if len(set(y_test)) == len(classes):
        metrics['roc_auc_ovr'] = float(roc_auc_score(y_test, probabilities, labels=classes, multi_class='ovr'))
    else:
        metrics['roc_auc_ovr'] = None
    metrics['selection_score'] = 0.7 * metrics['f1_macro'] + 0.3 * metrics['high_risk_recall']
    return metrics


def main() -> None:
    data = clean_data(pd.read_csv(DATASET_PATH))
    validate_columns(data)
    target = get_target(data)
    features = engineer_features(data)
    if target.isna().any():
        raise ValueError('Target contains missing labels.')
    if target.nunique() < 3:
        raise ValueError('The dataset must contain LOW, MEDIUM, and HIGH classes.')

    row_indices = np.arange(len(features))
    train_indices, test_indices = train_test_split(
        row_indices,
        test_size=0.25,
        random_state=RANDOM_STATE,
        stratify=target,
    )
    X_train, X_test = features.iloc[train_indices], features.iloc[test_indices]
    y_train, y_test = target.iloc[train_indices], target.iloc[test_indices]

    candidates = {
        'logistic_regression': LogisticRegression(max_iter=2000, class_weight='balanced', random_state=RANDOM_STATE),
        'random_forest': RandomForestClassifier(n_estimators=400, class_weight='balanced', random_state=RANDOM_STATE, n_jobs=-1),
        'gradient_boosting': GradientBoostingClassifier(random_state=RANDOM_STATE),
    }
    results = {}
    fitted = {}
    for name, classifier in candidates.items():
        pipeline = Pipeline([
            ('preprocess', build_preprocessor()),
            ('model', classifier),
        ])
        pipeline.fit(X_train, y_train)
        fitted[name] = pipeline
        results[name] = score_model(pipeline, X_test, y_test)

    best_name = max(results, key=lambda name: results[name]['selection_score'])
    best_pipeline = fitted[best_name]
    reference_values = {}
    for column in FEATURE_COLUMNS:
        if column in X_train.select_dtypes(include=np.number).columns:
            reference_values[column] = float(X_train[column].median())
        else:
            reference_values[column] = str(X_train[column].mode(dropna=True).iloc[0])

    artifact = {
        'model': best_pipeline,
        'model_name': best_name,
        'classes': list(best_pipeline.classes_),
        'feature_columns': FEATURE_COLUMNS,
        'reference_values': reference_values,
        'metrics': results,
        'test_indices': test_indices.tolist(),
        'dataset_path': str(DATASET_PATH),
    }
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(artifact, MODEL_PATH)
    print(json.dumps({'best_model': best_name, 'metrics': results}, indent=2, default=float))
    print(f'Saved model to {MODEL_PATH}')


if __name__ == '__main__':
    main()
