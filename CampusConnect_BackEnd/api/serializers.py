from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Role, Notice_And_Events
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Suggestion
from better_profanity import profanity

profanity.load_censor_words()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password", "first_name", "last_name"]


class UserRoleSerilizer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Role
        fields = ["user", "sem", "department", "role"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User.objects.create_user(**user_data)

        user_role = Role.objects.create(user=user, **validated_data)
        return user_role


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    raise AuthenticationFailed("This account is disable")
            else:
                raise AuthenticationFailed("Invalid login credentials.")
        else:
            raise serializers.ValidationError(
                "Both username and password are required."
            )

        data["user"] = user
        return data

    def create(self, validated_data):
        user = validated_data["user"]
        user_role = Role.objects.get(user=User.objects.get(username=user.username))

        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "username": user.username,
                "email": user.email,
                "role": user_role.role,
            },
        }


class NoticeAndEventsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    liked_users = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Notice_And_Events
        fields = [
            "id",
            "username",
            "department",
            "description",
            "image",
            "file",
            "like_count",
            "liked_users",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "like_count",
            "username",
            "created_at",
            "updated_at",
            "liked_users",
        ]


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = ["id", "user", "notice", "suggestion", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_suggestion(self, value):
        if profanity.contains_profanity(value):
            raise serializers.ValidationError(
                "Your suggestion contains inappropriate language."
            )
        return value
