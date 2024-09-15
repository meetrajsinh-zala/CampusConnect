from django.urls import path
from .views import (
    SignupView,
    LoginView,
    NoticeAndEventsListCreate,
    NoticeAndEventsProfilePage,
    like_notice
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path('notices/', NoticeAndEventsListCreate.as_view(), name='notice-list-create'),
    path('FilterNotice/',NoticeAndEventsProfilePage.as_view(),name='filter-notice'),
    path('FilterNotice/<int:pk>/', NoticeAndEventsProfilePage.as_view(), name='notice_and_events_detail'),
    path('notices/<int:pk>/like/', like_notice, name='like-notice'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)