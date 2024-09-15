import os
from django.http import HttpResponse
from django.conf import settings

def media_file(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as f:
            return HttpResponse(f.read(), content_type="image/png")
    else:
        return HttpResponse(status=404)