from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class SignupSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)

    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('An account with this email already exists.')
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        full_name = validated_data.pop('full_name').strip()
        first_name, _, last_name = full_name.partition(' ')
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name,
        )
        return user

    def to_representation(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'full_name': user.get_full_name(),
                'email': user.email,
            },
        }


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(username=attrs['email'].lower(), password=attrs['password'])
        if user is None:
            raise serializers.ValidationError('Invalid email or password.')
        if not user.is_active:
            raise serializers.ValidationError('This account is inactive.')
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'full_name': user.get_full_name(),
                'email': user.email,
            },
        }


class LoanApplicationInputSerializer(serializers.Serializer):
    age = serializers.IntegerField(min_value=18)
    monthly_income = serializers.FloatField(min_value=0)
    monthly_expenses = serializers.FloatField(min_value=0)
    existing_debt = serializers.FloatField(min_value=0)
    monthly_debt_payment = serializers.FloatField(min_value=0, default=0)
    savings_balance = serializers.FloatField(min_value=0, default=0)
    credit_score = serializers.IntegerField(min_value=0, max_value=1000)
    previous_loans = serializers.IntegerField(min_value=0, default=0)
    loans_repaid = serializers.IntegerField(min_value=0, default=0)
    loans_defaulted = serializers.IntegerField(min_value=0, default=0)
    late_payments = serializers.IntegerField(min_value=0, default=0)
    credit_history_years = serializers.IntegerField(min_value=0, default=0)
    requested_loan_amount = serializers.FloatField(min_value=1)
    loan_term_months = serializers.IntegerField(min_value=1)
    interest_rate = serializers.FloatField(min_value=0, default=15)
    employment_years = serializers.IntegerField(min_value=0, default=0)
    collateral_value = serializers.FloatField(min_value=0, default=0)
    employment_type = serializers.CharField(max_length=80, default='Salaried')
    education = serializers.CharField(max_length=80, default='Graduate')
    loan_purpose = serializers.CharField(max_length=100, default='Personal')
    loan_type = serializers.CharField(max_length=80, default='Personal')
