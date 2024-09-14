from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Role(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    role = models.CharField(max_length=10)

class Notice_And_Events(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=60)
    description = models.TextField()
    image = models.ImageField(upload_to='notices/')
    like_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def increment_like_count(self):
        self.like_count += 1
        self.save()

    def decrement_like_count(self):
        if self.like_count > 0:
            self.like_count -= 1
            self.save()