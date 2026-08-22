from django.urls import path

from .views import DashboardView, LoanAnalyzeView, LoanListView, LoginView, SignupView

urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('loans/analyze/', LoanAnalyzeView.as_view(), name='loan-analyze'),
    path('loans/', LoanListView.as_view(), name='loan-list'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
