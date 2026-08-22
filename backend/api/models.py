from django.conf import settings
from django.db import models


class LoanApplication(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('UNDER_REVIEW', 'Under review'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]
    RISK_CHOICES = [('LOW', 'Low'), ('MEDIUM', 'Medium'), ('HIGH', 'High')]
    DECISION_CHOICES = [('APPROVED', 'Approved'), ('REVIEW', 'Review'), ('REJECTED', 'Rejected')]

    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='loan_applications')
    loan_id = models.CharField(max_length=32, unique=True, editable=False)
    age = models.PositiveIntegerField()
    monthly_income = models.DecimalField(max_digits=14, decimal_places=2)
    monthly_expenses = models.DecimalField(max_digits=14, decimal_places=2)
    existing_debt = models.DecimalField(max_digits=14, decimal_places=2)
    monthly_debt_payment = models.DecimalField(max_digits=14, decimal_places=2)
    savings_balance = models.DecimalField(max_digits=14, decimal_places=2)
    credit_score = models.PositiveIntegerField()
    previous_loans = models.PositiveIntegerField(default=0)
    loans_repaid = models.PositiveIntegerField(default=0)
    loans_defaulted = models.PositiveIntegerField(default=0)
    late_payments = models.PositiveIntegerField(default=0)
    credit_history_years = models.PositiveIntegerField(default=0)
    requested_loan_amount = models.DecimalField(max_digits=14, decimal_places=2)
    loan_term_months = models.PositiveIntegerField()
    interest_rate = models.DecimalField(max_digits=6, decimal_places=2, default=15)
    employment_years = models.PositiveIntegerField(default=0)
    collateral_value = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    employment_type = models.CharField(max_length=80, default='Salaried')
    education = models.CharField(max_length=80, default='Graduate')
    loan_purpose = models.CharField(max_length=100, default='Personal')
    loan_type = models.CharField(max_length=80, default='Personal')

    risk_level = models.CharField(max_length=10, choices=RISK_CHOICES)
    risk_score = models.FloatField()
    confidence = models.FloatField()
    ai_recommendation = models.CharField(max_length=12, choices=DECISION_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    approved_amount = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    explanation = models.TextField()
    probabilities = models.JSONField(default=dict)
    important_factors = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.loan_id} - {self.applicant.get_full_name() or self.applicant.email}'
