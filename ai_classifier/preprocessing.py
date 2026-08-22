from __future__ import annotations

from typing import Iterable

import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


NUMERIC_FEATURES = [
    'age', 'monthly_income', 'monthly_expenses', 'existing_debt',
    'monthly_debt_payment', 'savings_balance', 'credit_score',
    'previous_loans', 'loans_repaid', 'loans_defaulted', 'late_payments',
    'credit_history_years', 'requested_loan_amount', 'loan_term_months',
    'interest_rate', 'employment_years', 'collateral_value',
]
CATEGORICAL_FEATURES = ['employment_type', 'education', 'loan_purpose', 'loan_type']
DERIVED_FEATURES = [
    'debt_to_income_ratio', 'expense_to_income_ratio', 'loan_to_income_ratio',
    'repayment_rate', 'default_rate', 'savings_to_loan_ratio',
]
FEATURE_COLUMNS = NUMERIC_FEATURES + CATEGORICAL_FEATURES + DERIVED_FEATURES
REQUIRED_COLUMNS = set(NUMERIC_FEATURES + CATEGORICAL_FEATURES)
OUTCOME_COLUMNS = {'loan_outcome', 'risk_level'}


class QuantileClipper(BaseEstimator, TransformerMixin):
    """Clip numeric values to training-set quantiles without leaking test data."""

    def __init__(self, lower: float = 0.01, upper: float = 0.99):
        self.lower = lower
        self.upper = upper

    def fit(self, X, y=None):
        values = np.asarray(X, dtype=float)
        self.lower_bounds_ = np.nanquantile(values, self.lower, axis=0)
        self.upper_bounds_ = np.nanquantile(values, self.upper, axis=0)
        return self

    def transform(self, X):
        values = np.asarray(X, dtype=float)
        return np.clip(values, self.lower_bounds_, self.upper_bounds_)

    def get_feature_names_out(self, input_features=None):
        return np.asarray(input_features, dtype=object)


def validate_columns(data: pd.DataFrame, required: Iterable[str] = REQUIRED_COLUMNS) -> None:
    missing = sorted(set(required) - set(data.columns))
    if missing:
        raise ValueError(f'Missing required columns: {", ".join(missing)}')


def clean_data(data: pd.DataFrame) -> pd.DataFrame:
    cleaned = data.copy()
    cleaned = cleaned.drop_duplicates().reset_index(drop=True)
    for column in NUMERIC_FEATURES:
        cleaned[column] = pd.to_numeric(cleaned[column], errors='coerce')
    for column in CATEGORICAL_FEATURES:
        cleaned[column] = cleaned[column].astype('string').str.strip().replace('', pd.NA)
    return cleaned


def engineer_features(data: pd.DataFrame) -> pd.DataFrame:
    validate_columns(data)
    features = clean_data(data)
    income = features['monthly_income'].replace(0, np.nan)
    requested = features['requested_loan_amount'].replace(0, np.nan)
    previous = features['previous_loans'].replace(0, np.nan)
    features['debt_to_income_ratio'] = features['monthly_debt_payment'] / income
    features['expense_to_income_ratio'] = features['monthly_expenses'] / income
    features['loan_to_income_ratio'] = features['requested_loan_amount'] / income
    features['repayment_rate'] = features['loans_repaid'] / previous
    features['default_rate'] = features['loans_defaulted'] / previous
    features['savings_to_loan_ratio'] = features['savings_balance'] / requested
    return features[FEATURE_COLUMNS]


def outcome_to_risk(outcome: pd.Series) -> pd.Series:
    normalized = outcome.astype('string').str.strip().str.upper()
    mapping = {
        'PAID': 'LOW',
        'REPAID': 'LOW',
        'LATE': 'MEDIUM',
        'RESTRUCTURED': 'MEDIUM',
        'DEFAULTED': 'HIGH',
        'DEFAULT': 'HIGH',
    }
    labels = normalized.map(mapping)
    if labels.isna().any():
        unknown = sorted(normalized[labels.isna()].dropna().unique().tolist())
        raise ValueError(f'Unsupported loan_outcome values: {unknown}')
    return labels


def get_target(data: pd.DataFrame) -> pd.Series:
    if 'risk_level' in data.columns:
        target = data['risk_level'].astype('string').str.strip().str.upper()
        if not set(target.dropna().unique()).issubset({'LOW', 'MEDIUM', 'HIGH'}):
            raise ValueError('risk_level must contain only LOW, MEDIUM, or HIGH.')
        return target
    if 'loan_outcome' not in data.columns:
        raise ValueError('Dataset must contain risk_level or loan_outcome to create the target.')
    return outcome_to_risk(data['loan_outcome'])


def build_preprocessor() -> ColumnTransformer:
    numeric_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='median')),
        ('clipper', QuantileClipper()),
        ('scaler', StandardScaler()),
    ])
    categorical_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False)),
    ])
    return ColumnTransformer([
        ('numeric', numeric_pipeline, NUMERIC_FEATURES + DERIVED_FEATURES),
        ('categorical', categorical_pipeline, CATEGORICAL_FEATURES),
    ])
