from django.contrib import admin
from .models import Role, Notice_And_Events, Suggestion

# Register your models here.
admin.site.register(Role)
admin.site.register(Notice_And_Events)
admin.site.register(Suggestion)
