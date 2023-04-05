from django.urls import path
from .views import index
from django.urls import re_path


urlpatterns = [
    path('', index),
    re_path(r'.*', index)
]