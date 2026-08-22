import sys
import uuid
from collections import Counter
from pathlib import Path

from django.conf import settings
from django.db.models import Avg, Sum
from rest_framework import generics, permissions
from rest_framework.response import Response

from .models import LoanApplication
from .serializers import LoginSerializer, LoanApplicationInputSerializer, SignupSerializer

AI_ROOT = Path(settings.BASE_DIR).parent / 'ai_classifier'
if str(AI_ROOT) not in sys.path:
    sys.path.insert(0, str(AI_ROOT))
from predict import predict_risk


class SignupView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SignupSerializer


class LoginView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)


def serialize_application(application):
    return {
        'id': str(application.id),
        'applicantId': str(application.applicant_id),
        'applicantName': application.applicant.get_full_name() or application.applicant.email,
        'applicantEmail': application.applicant.email,
        'loanId': application.loan_id,
        'loanPurpose': application.loan_purpose,
        'loanType': application.loan_type,
        'requestedAmount': float(application.requested_loan_amount),
        'approvedAmount': float(application.approved_amount) if application.approved_amount is not None else None,
        'loanTermMonths': application.loan_term_months,
        'interestRate': float(application.interest_rate),
        'collateralValue': float(application.collateral_value),
        'collateralType': 'None',
        'creditScore': application.credit_score,
        'monthlyIncome': float(application.monthly_income),
        'existingDebt': float(application.existing_debt),
        'riskLevel': application.risk_level,
        'riskScore': application.risk_score,
        'aiRecommendation': application.ai_recommendation,
        'confidence': application.confidence,
        'status': application.status,
        'date': application.created_at.date().isoformat(),
        'explanation': application.explanation,
    }


class LoanAnalyzeView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LoanApplicationInputSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        input_data = serializer.validated_data
        result = predict_risk(input_data)
        risk_level = result['risk_level']
        recommendation = {'LOW': 'APPROVED', 'MEDIUM': 'REVIEW', 'HIGH': 'REJECTED'}[risk_level]
        status = {'APPROVED': 'APPROVED', 'REVIEW': 'UNDER_REVIEW', 'REJECTED': 'REJECTED'}[recommendation]
        requested_amount = input_data['requested_loan_amount']
        approved_amount = requested_amount if recommendation == 'APPROVED' else None
        factors = result.get('important_factors', [])
        factor_text = ', '.join(factor['feature'] for factor in factors[:3]) or 'the submitted financial and credit profile'
        explanation = f"The trained model classified this application as {risk_level} risk based on {factor_text}."
        application = LoanApplication.objects.create(
            applicant=request.user,
            loan_id=f'LN-{uuid.uuid4().hex[:10].upper()}',
            risk_level=risk_level,
            risk_score=round((result['probabilities'].get('MEDIUM', 0) * 50) + (result['probabilities'].get('HIGH', 0) * 100), 2),
            confidence=result['confidence'],
            ai_recommendation=recommendation,
            status=status,
            approved_amount=approved_amount,
            explanation=explanation,
            probabilities=result['probabilities'],
            important_factors=factors,
            **input_data,
        )
        response = {
            'application_id': str(application.id),
            'decision': recommendation,
            'risk_level': risk_level,
            'risk_score': application.risk_score,
            'confidence': result['confidence'],
            'recommended_amount': approved_amount or 0,
            'recommended_term': input_data['loan_term_months'],
            'explanation': explanation,
            'positive_factors': [factor['feature'] for factor in factors if factor['impact'] == 'positive'],
            'risk_factors': [factor['feature'] for factor in factors if factor['impact'] == 'negative'],
            'breakdown': {},
            'risk_factor_details': factors,
        }
        return Response(response, status=201)


class LoanListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        return Response([serialize_application(application) for application in LoanApplication.objects.select_related('applicant').all()])


class DashboardView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        records = list(LoanApplication.objects.select_related('applicant').all())
        total = len(records)
        approved = sum(record.status == 'APPROVED' for record in records)
        rejected = sum(record.status == 'REJECTED' for record in records)
        pending = sum(record.status in {'PENDING', 'UNDER_REVIEW'} for record in records)
        monthly = Counter(record.created_at.strftime('%Y-%m') for record in records)
        risk = Counter(record.risk_level for record in records)
        decisions = Counter(record.status for record in records)
        amounts = Counter(
            'Under ₦1M' if record.requested_loan_amount < 1_000_000 else
            '₦1M–₦5M' if record.requested_loan_amount < 5_000_000 else
            '₦5M–₦10M' if record.requested_loan_amount < 10_000_000 else 'Over ₦10M'
            for record in records
        )
        month_labels = sorted(monthly)
        applications_over_time = [{'month': label, 'applications': monthly[label], 'approved': sum(record.created_at.strftime('%Y-%m') == label and record.status == 'APPROVED' for record in records)} for label in month_labels]
        return Response({
            'stats': {
                'totalApplications': total,
                'approvedLoans': approved,
                'rejectedLoans': rejected,
                'pendingApplications': pending,
                'averageRiskScore': round(sum(record.risk_score for record in records) / total, 1) if total else 0,
                'totalLoanAmount': float(sum(record.requested_loan_amount for record in records)),
                'approvalRate': round(approved / total * 100, 1) if total else 0,
            },
            'applications': [serialize_application(record) for record in records],
            'overTime': applications_over_time,
            'approvalRejection': [
                {'name': 'Approved', 'value': approved, 'color': '#10b981'},
                {'name': 'Rejected', 'value': rejected, 'color': '#f43f5e'},
                {'name': 'Pending', 'value': pending, 'color': '#f59e0b'},
            ],
            'riskDistribution': [
                {'name': level, 'value': risk[level], 'color': color}
                for level, color in [('LOW', '#10b981'), ('MEDIUM', '#f59e0b'), ('HIGH', '#f43f5e')]
            ],
            'amountDistribution': [{'name': name, 'value': amounts[name]} for name in ['Under ₦1M', '₦1M–₦5M', '₦5M–₦10M', 'Over ₦10M']],
            'monthlyVolume': [{'month': label, 'volume': sum(float(record.approved_amount or 0) for record in records if record.created_at.strftime('%Y-%m') == label)} for label in month_labels],
        })
