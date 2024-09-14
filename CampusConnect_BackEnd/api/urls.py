from django.urls import path
from .views import (
    SignupView,
    LoginView,
    NoticeAndEventsListCreate
)

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path('notices/', NoticeAndEventsListCreate.as_view(), name='notice-list-create'),
]