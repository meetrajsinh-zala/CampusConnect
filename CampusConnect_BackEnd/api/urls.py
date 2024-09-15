from django.urls import path
from .views import (
    SignupView,
    LoginView,
    NoticeAndEventsListCreate
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path('notices/', NoticeAndEventsListCreate.as_view(), name='notice-list-create'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)