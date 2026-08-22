# AI Loan Risk Classifier

Standalone multiclass loan-risk classifier. It is independent from the React frontend and Django backend.

## Dataset and target

`dataset/loans.csv` is a historical-style sample dataset. The target is derived from the separate `loan_outcome` column:

- `PAID` or `REPAID` -> `LOW`
- `LATE` or `RESTRUCTURED` -> `MEDIUM`
- `DEFAULTED` -> `HIGH`

`loan_outcome` is never passed to the model, which prevents target leakage. Historical `loans_repaid`, `loans_defaulted`, and `late_payments` describe behavior before the current application.

## Install and train

```bash
cd ai_classifier
python -m pip install -r requirements.txt
python train.py
python evaluate.py
```

Training compares Logistic Regression, Random Forest, and Gradient Boosting. The selected model is saved to `models/loan_risk_classifier.pkl`. Selection prioritizes macro F1 and HIGH-risk recall.

## Predict

```python
from predict import predict_risk

result = predict_risk({
    'age': 28,
    'monthly_income': 350000,
    'monthly_expenses': 180000,
    'existing_debt': 500000,
    'monthly_debt_payment': 70000,
    'savings_balance': 800000,
    'credit_score': 720,
    'previous_loans': 3,
    'loans_repaid': 3,
    'loans_defaulted': 0,
    'late_payments': 1,
    'credit_history_years': 5,
    'requested_loan_amount': 1500000,
    'loan_term_months': 24,
    'interest_rate': 15,
    'employment_years': 4,
    'collateral_value': 2000000,
    'employment_type': 'Salaried',
    'education': 'Graduate',
    'loan_purpose': 'Business',
    'loan_type': 'Personal',
})
```

The result contains the predicted risk, probability-based confidence, class probabilities, and the most influential features. Feature impacts are calculated by comparing the model prediction with a training-set reference value.
