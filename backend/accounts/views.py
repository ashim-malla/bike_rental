from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db.models import Q
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Profile

User = get_user_model()


def user_payload(user):
    profile = Profile.objects.filter(user=user).first()
    return {
        "id": user.id,
        "name": user.get_full_name() or user.username,
        "email": user.email,
        "phone": profile.phone if profile else "",
    }


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = (request.data.get("email") or "").strip()
    password = request.data.get("password") or ""

    account = User.objects.filter(email__iexact=email).first()
    user = (
        authenticate(request, username=account.username, password=password)
        if account
        else None
    )
    if user is None:
        return Response({"detail": "Invalid email or password."}, status=401)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "user": user_payload(user)})


@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    name = (request.data.get("name") or "").strip()
    phone = (request.data.get("phone") or "").strip()
    email = (request.data.get("email") or "").strip().lower()
    password = request.data.get("password") or ""

    if not name:
        return Response({"detail": "Please enter your name."}, status=400)
    if not phone or len(phone) > 20:
        return Response({"detail": "Please enter a valid phone number."}, status=400)

    try:
        validate_email(email)
    except ValidationError:
        return Response({"detail": "Please enter a valid email address."}, status=400)
    if len(email) > 150:
        return Response({"detail": "That email address is too long."}, status=400)

    if User.objects.filter(Q(email__iexact=email) | Q(username__iexact=email)).exists():
        return Response(
            {"detail": "An account with this email already exists."}, status=400
        )

    try:
        validate_password(password)
    except ValidationError as error:
        return Response({"detail": " ".join(error.messages)}, status=400)

    first_name, _, last_name = name.partition(" ")
    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
    )
    Profile.objects.create(user=user, phone=phone)
    token = Token.objects.create(user=user)
    return Response({"token": token.key, "user": user_payload(user)}, status=201)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me_view(request):
    return Response(user_payload(request.user))


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    Token.objects.filter(user=request.user).delete()
    return Response(status=204)