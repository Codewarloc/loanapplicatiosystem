from django.contrib import admin

from .models import LoanApplication


@admin.register(LoanApplication)
class LoanApplicationAdmin(admin.ModelAdmin):
    list_display = ('loan_id', 'applicant', 'risk_level', 'risk_score', 'ai_recommendation', 'status', 'requested_loan_amount', 'created_at')
    list_filter = ('risk_level', 'ai_recommendation', 'status', 'loan_type', 'loan_purpose', 'created_at')
    search_fields = ('loan_id', 'applicant__username', 'applicant__email', 'applicant__first_name', 'applicant__last_name')
    readonly_fields = ('loan_id', 'risk_level', 'risk_score', 'confidence', 'ai_recommendation', 'probabilities', 'important_factors', 'created_at')
    date_hierarchy = 'created_at'
    fieldsets = (
        ('Applicant and loan', {'fields': ('applicant', 'loan_id', 'loan_purpose', 'loan_type', 'requested_loan_amount', 'loan_term_months', 'interest_rate')}),
        ('Financial profile', {'fields': ('age', 'monthly_income', 'monthly_expenses', 'existing_debt', 'monthly_debt_payment', 'savings_balance', 'collateral_value')}),
        ('Credit profile', {'fields': ('credit_score', 'previous_loans', 'loans_repaid', 'loans_defaulted', 'late_payments', 'credit_history_years')}),
        ('Employment and education', {'fields': ('employment_type', 'employment_years', 'education')}),
        ('AI result', {'fields': ('risk_level', 'risk_score', 'confidence', 'ai_recommendation', 'status', 'approved_amount', 'explanation', 'probabilities', 'important_factors', 'created_at')}),
    )
