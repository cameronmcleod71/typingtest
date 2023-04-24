from rest_framework import serializers
from django.contrib.auth.models import User
from .models import SpecialCTest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SpecialCharTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialCTest
        read_only_fields = ['id','timestamp']
        fields = ['test','results','duration','owner','timestamp','id']