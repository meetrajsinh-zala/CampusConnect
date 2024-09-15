from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.
class Role(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    role = models.CharField(max_length=10)

class Notice_And_Events(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=60)
    description = models.TextField()
    image = models.ImageField(upload_to='notices/')
    file = models.FileField(upload_to='files/', blank=True, null=True)
    like_count = models.PositiveIntegerField(default=0)
    liked_users = models.ManyToManyField(User, related_name='liked_notices', blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)