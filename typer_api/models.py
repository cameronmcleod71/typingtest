from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

# Create your models here.


class SpecialCharTest(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='special_char_test')
    timestamp = models.DateTimeField(auto_now_add=True)
    test = models.JSONField(models.JSONField())
    results = models.JSONField()
    duration = models.IntegerField(default=0) # stored in seconds


