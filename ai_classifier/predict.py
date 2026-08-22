from __future__ import annotations

from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd

from preprocessing import CATEGORICAL_FEATURES, FEATURE_COLUMNS, NUMERIC_FEATURES, engineer_features


ROOT = Path(__file__).resolve().parent
MODEL_PATH = ROOT / 'models' / 'loan_risk_classifier.pkl'
RISK_ORDER = {'LOW': 0.0, 'MEDIUM': 50.0, 'HIGH': 100.0}


def _expected_risk(probabilities: dict[str, float]) -> float:
    return sum(RISK_ORDER[label] * probability for label, probability in probabilities.items())


def _probabilities(model, row: pd.DataFrame) -> dict[str, float]:
    values = model.predict_proba(row)[0]
    raw = {label: float(probability) for label, probability in zip(model.classes_, values)}
    return {label: raw[label] for label in ('LOW', 'MEDIUM', 'HIGH') if label in raw}


def _feature_importances(model, feature_columns: list[str]) -> dict[str, float]:
    preprocessor = model.named_steps['preprocess']
    classifier = model.named_steps['model']
    transformed_names = preprocessor.get_feature_names_out()
    if hasattr(classifier, 'feature_importances_'):
        importances = np.asarray(classifier.feature_importances_, dtype=float)
    else:
        importances = np.mean(np.abs(np.asarray(classifier.coef_, dtype=float)), axis=0)
    totals = {feature: 0.0 for feature in feature_columns}
    for name, importance in zip(transformed_names, importances):
        raw_name = name.split('__', 1)[-1]
        matched = next((feature for feature in feature_columns if raw_name == feature or raw_name.startswith(f'{feature}_')), None)
        if matched:
            totals[matched] += float(importance)
    return totals


def _impact(model, row: pd.DataFrame, feature: str, reference: Any, current_probabilities: dict[str, float]) -> str:
    if pd.isna(row.iloc[0][feature]) or row.iloc[0][feature] == reference:
        return 'neutral'
    counterfactual = row.copy()
    counterfactual.loc[counterfactual.index[0], feature] = reference
    counterfactual_features = engineer_features(counterfactual)
    reference_probabilities = _probabilities(model, counterfactual_features)
    delta = _expected_risk(reference_probabilities) - _expected_risk(current_probabilities)
    if delta < -1:
        return 'negative'
    if delta > 1:
        return 'positive'
    return 'neutral'


def predict_risk(applicant_data: dict[str, Any], model_path: str | Path = MODEL_PATH) -> dict[str, Any]:
    artifact = joblib.load(model_path)
    model = artifact['model']
    feature_columns = artifact.get('feature_columns', FEATURE_COLUMNS)
    row = pd.DataFrame([applicant_data])
    model_input = engineer_features(row)
    prediction = str(model.predict(model_input)[0])
    probabilities = _probabilities(model, model_input)
    importances = _feature_importances(model, feature_columns)
    explainable_features = NUMERIC_FEATURES + CATEGORICAL_FEATURES
    top_features = [
        feature for feature in sorted(importances, key=importances.get, reverse=True)
        if feature in explainable_features
    ][:5]
    reference_values = artifact.get('reference_values', {})
    important_factors = [
        {
            'feature': feature,
            'value': applicant_data.get(feature),
            'impact': _impact(model, row, feature, reference_values.get(feature), probabilities),
        }
        for feature in top_features
        if feature in applicant_data
    ]
    return {
        'risk_level': prediction,
        'confidence': round(probabilities[prediction] * 100, 1),
        'probabilities': {label: round(value, 6) for label, value in probabilities.items()},
        'important_factors': important_factors,
    }


if __name__ == '__main__':
    example = {
        'age': 28, 'monthly_income': 350000, 'monthly_expenses': 180000,
        'existing_debt': 500000, 'monthly_debt_payment': 70000,
        'savings_balance': 800000, 'credit_score': 720, 'previous_loans': 3,
        'loans_repaid': 3, 'loans_defaulted': 0, 'late_payments': 1,
        'credit_history_years': 5, 'requested_loan_amount': 1500000,
        'loan_term_months': 24, 'interest_rate': 15, 'employment_years': 4,
        'collateral_value': 2000000, 'employment_type': 'Salaried',
        'education': 'Graduate', 'loan_purpose': 'Business', 'loan_type': 'Personal',
    }
    print(predict_risk(example))
