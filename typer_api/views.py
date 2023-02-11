from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import SpecialTypingTest


# Create your views here.
def index(requests):
    return HttpResponse("Hello from the api")


@api_view(['GET'])
def get_typing_test(requests):
    new_test = SpecialTypingTest()
    new_test.generate_test()
    return Response(new_test.get_test(), status=status.HTTP_200_OK)
