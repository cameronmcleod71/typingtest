from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User



# Create your models here.


class SpecialCTest(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='special_char_test')
    timestamp = models.DateTimeField(auto_now_add=True)
    test = models.JSONField(models.JSONField())
    results = models.JSONField()
    duration = models.IntegerField(default=0) # stored in seconds

class ProgrammerTypingTest(models.Model):
    PYTHON = 'python'
    JAVASCRIPT = 'javascript'
    JAVA = 'java'
    CHOICES = [
        (PYTHON, 'Python'),
        (JAVASCRIPT, 'JavaScript'),
        (JAVA, 'Java'),
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='programming_test')
    language = models.CharField(max_length=50, choices=CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    test = models.JSONField(models.JSONField())
    results = models.JSONField()
    duration = models.IntegerField(default=0)


class ProgrammerTestScript(models.Model):
    PYTHON = 'python'
    JAVASCRIPT = 'javascript'
    JAVA = 'java'
    CHOICES = [
        (PYTHON, 'Python'),
        (JAVASCRIPT, 'JavaScript'),
        (JAVA, 'Java'),
    ]

    created = models.DateTimeField(auto_now_add=True)
    script = models.JSONField()
    language = models.CharField(max_length=50, choices=CHOICES)
    length = models.IntegerField(default=1) #number of lines






