from rest_framework import status
from .models import Notice_And_Events
from django.contrib.auth.models import User
from .serializers import UserRoleSerilizer,LoginSerializer, NoticeAndEventsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

class SignupView(APIView):
    def post(self, request):
        serializer = UserRoleSerilizer(data = request.data)
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
        notices = Notice_And_Events.objects.all()
        serializer = NoticeAndEventsSerializer(notices, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        user = request.user
        request.data._mutable = True
        request.data['user'] = user.id
        request.data._mutable = False
        serializer = NoticeAndEventsSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class NoticeAndEventsProfilePage(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        notices = Notice_And_Events.objects.filter(user=request.user)
        serializer = NoticeAndEventsSerializer(notices, many=True)
        return Response(serializer.data)