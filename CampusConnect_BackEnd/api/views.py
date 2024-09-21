from rest_framework import status
from .models import Notice_And_Events, Role
from rest_framework.decorators import api_view, permission_classes
from .serializers import (
    UserRoleSerilizer,
    LoginSerializer,
    NoticeAndEventsSerializer,
    SuggestionSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import get_object_or_404


class SignupView(APIView):
    def post(self, request):
        serializer = UserRoleSerilizer(data=request.data)
        if serializer.is_valid():
            user_details = serializer.save()
            response_data = {
                "message": "Signup successful",
                "user": {
                    "id": user_details.user.id,
                    "username": user_details.user.username,
                    "email": user_details.user.email,
                    "first_name": user_details.user.first_name,
                    "last_name": user_details.user.last_name,
                    "role": user_details.role,
                },
            }
            if user_details.role == "student":
                response_data["user"][
                    "sem"
                ] = user_details.sem  # Correct way to add fields
                response_data["user"]["department"] = user_details.department

            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            token_data = serializer.save()
            return Response(token_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoticeAndEventsListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        notices = Notice_And_Events.objects.all().order_by("-created_at")
        serializer = NoticeAndEventsSerializer(notices, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NoticeAndEventsSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.validated_data["user"] = request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoticeAndEventsProfilePage(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        notices = Notice_And_Events.objects.filter(user=request.user)
        serializer = NoticeAndEventsSerializer(notices, many=True)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        try:
            post = Notice_And_Events.objects.get(pk=pk, user=request.user)
        except Notice_And_Events.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk, format=None):
        try:
            post = Notice_And_Events.objects.get(pk=pk, user=request.user)
        except Notice_And_Events.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = NoticeAndEventsSerializer(
            post, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like_notice(request, pk):
    print(request.user)
    try:
        notice = Notice_And_Events.objects.get(pk=pk)
    except Notice_And_Events.DoesNotExist:
        return Response({"error": "Notice not found"}, status=status.HTTP_404_NOT_FOUND)

    user = request.user
    if user in notice.liked_users.all():
        notice.liked_users.remove(user)
        notice.like_count -= 1
    else:
        notice.liked_users.add(user)
        notice.like_count += 1
    notice.save()
    return Response({"like_count": notice.like_count}, status=status.HTTP_200_OK)


def download_file(request, pk):
    notice = get_object_or_404(Notice_And_Events, pk=pk)

    if not notice.file:
        raise Http404("File does not exist")

    file = notice.file
    response = HttpResponse(file, content_type="application/octet-stream")
    response["Content-Disposition"] = f'attachment; filename="{file.name}"'
    return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getProfile(request):
    user = request.user
    user_detail = Role.objects.get(user=user)
    Profile = {
        "username": user.username,
        "first name": user.first_name,
        "last name": user.last_name,
        "email": user.email,
        "role": user_detail.role,
        "department": user_detail.department,
        "sem": user_detail.sem,
    }
    return JsonResponse(Profile)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def departmentWiseNotice(request):
    user = request.user
    user_details = Role.objects.get(user=user)
    Notices = Notice_And_Events.objects.filter(department=user_details.department)
    serializer = NoticeAndEventsSerializer(Notices, many=True)
    return Response(serializer.data)


class SuggestionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, notice_id):
        try:
            notice = Notice_And_Events.objects.get(id=notice_id)
        except Notice_And_Events.DoesNotExist:
            return Response(
                {"error": "Notice not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Attach the user and notice to the serializer's data
        serializer = SuggestionSerializer(
            data={
                "user": request.user.id,
                "notice": notice.id,
                "suggestion": request.data.get("suggestion"),
            }
        )

        if serializer.is_valid():
            suggestion = serializer.save()
            return Response(
                SuggestionSerializer(suggestion).data, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, notice_id):
        try:
            notices = Notice_And_Events.objects.get(id=notice_id)
        except Notice_And_Events.DoesNotExist:
            return Response(
                {"error": "Notice not found"}, status=status.HTTP_404_NOT_FOUND
            )
        suggestions = (
            notices.suggestion_set.all()
        )  # Adjust according to your related name if necessary
        all_suggestions = []

        for suggestion in suggestions:
            user_details = Role.objects.get(
                user=suggestion.user
            )  # Fetch user details related to the suggestion
            all_suggestions.append(
                {
                    "first_name": suggestion.user.first_name,
                    "last_name": suggestion.user.last_name,
                    "username": suggestion.user.username,
                    "semester": user_details.sem,
                    "department": user_details.department,
                    "suggestion": suggestion.suggestion,
                    "created_at": suggestion.created_at,  # Optional: Include created timestamp
                }
            )
        return Response(all_suggestions, status=status.HTTP_200_OK)


def Filter_Based_On_Id(request, notice_id):
    try:
        notice = Notice_And_Events.objects.get(id=notice_id)
    except Notice_And_Events.DoesNotExist:
        return JsonResponse(
            {"error": "Notice not found"}, status=status.HTTP_404_NOT_FOUND
        )

    # Serialize the notice instance
    serializer = NoticeAndEventsSerializer(notice)
    return JsonResponse(serializer.data, safe=False)
