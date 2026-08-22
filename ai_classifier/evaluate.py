from __future__ import annotations

import json
from pathlib import Path

import joblib
import pandas as pd
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score, precision_score, recall_score, roc_auc_score

from preprocessing import clean_data, engineer_features, get_target, validate_columns


ROOT = Path(__file__).resolve().parent
DATASET_PATH = ROOT / 'dataset' / 'loans.csv'
MODEL_PATH = ROOT / 'models' / 'loan_risk_classifier.pkl'


def main() -> None:
    artifact = joblib.load(MODEL_PATH)
    data = clean_data(pd.read_csv(DATASET_PATH))
    validate_columns(data)
    features = engineer_features(data)
    target = get_target(data)
    indices = artifact['test_indices']
    X_test, y_test = features.iloc[indices], target.iloc[indices]
    model = artifact['model']
    predictions = model.predict(X_test)
    probabilities = model.predict_proba(X_test)
    labels = ['LOW', 'MEDIUM', 'HIGH']
    output = {
        'model_name': artifact['model_name'],
        'accuracy': accuracy_score(y_test, predictions),
        'precision_macro': precision_score(y_test, predictions, average='macro', zero_division=0),
        'recall_macro': recall_score(y_test, predictions, average='macro', zero_division=0),
        'f1_macro': f1_score(y_test, predictions, average='macro', zero_division=0),
        'confusion_matrix': confusion_matrix(y_test, predictions, labels=labels).tolist(),
        'classification_report': classification_report(y_test, predictions, labels=labels, zero_division=0, output_dict=True),
    }
    if len(set(y_test)) == len(labels):
        output['roc_auc_ovr'] = roc_auc_score(y_test, probabilities, labels=list(model.classes_), multi_class='ovr')
    print(json.dumps(output, indent=2, default=float))


if __name__ == '__main__':
    main()
