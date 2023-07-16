from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CompletedTypingTest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# class SpecialCharTestSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SpecialCTest
#         read_only_fields = ['id','timestamp']
#         fields = ['test','results','duration','owner','timestamp','id']

class CompletedTypingTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedTypingTest
        read_only_fields = ['id']
        fields = ['test','results','duration','owner','time_taken','id','test_type','wpm', 'language']