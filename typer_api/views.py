from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import SpecialTypingTest
from .utils import example_programming_typing_test
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib.auth.models import User
from django.contrib import auth
from django.utils.decorators import method_decorator
import json
from .serializers import SpecialCharTestSerializer
from .models import SpecialCharTest

class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated
            response_data = {}
            if isAuthenticated:
                response_data['isAuthenticated'] = 'success'
                response_data['username'] = user.username
                return Response(response_data)
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })


# Create your views here.
def index(requests):
    return HttpResponse("Hello from the api")


class GetSpecialCharTest(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, requests, format=None):
        new_test = SpecialTypingTest()
        new_test.generate_test()
        return Response(new_test.get_test(), status=status.HTTP_200_OK)

class GetProgrammingTTest(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, requests, format=None):
        new_test = example_programming_typing_test()
        print(new_test)
        return Response(new_test, status=status.HTTP_200_OK)
        
    

@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            if User.objects.filter(username=username).exists():
                return Response({ 'error': 'Username already exists' })
            else:
                if len(password) < 6:
                    return Response({ 'error': 'Password must be at least 6 characters' })
                else:
                    user = User.objects.create_user(username=username, password=password)

                    user = User.objects.get(id=user.id) # Maybe this is supposed to be a serializer

                    # user_profile = UserProfile.objects.create(user=user, first_name='', last_name='', phone='', city='')

                    return Response({ 'success': 'User created successfully' })
        except:
                return Response({ 'error': 'Something went wrong when registering account' })
        
@method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({ 'success': 'Loggout Out' })
        except:
            return Response({ 'error': 'Something went wrong when logging out' })
        
@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({ 'success': 'User authenticated' })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })

# We can use this to dynamically get a csrf token in React
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })

class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response({ 'success': 'User deleted successfully' })
        except:
            return Response({ 'error': 'Something went wrong when trying to delete user' })

@method_decorator(csrf_protect, name='dispatch')
class SaveSpecialCharTest(APIView):
    def post(self, request, format=None):
        data = self.request.data
        user = self.request.user

        data['owner'] = user.id # might not be a good practice to edit the request itself
        print(data)
        data['results'] = json.dumps(data['results'])
        for a in data['test']:
            a = json.dumps(a)
        data['test'] = json.dumps(data['test'])

        serializer = SpecialCharTestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Test saved'})
        print(serializer.errors)
        return Response({'error': 'Test not valid'})
    
class GetPastSpecialCharTest(APIView):
    def get(self,request, format=None):
        try:

            user = self.request.user
            tests = SpecialCharTest.objects.filter(owner=user.id)
            serializer = SpecialCharTestSerializer(tests, many=True) # may be a bug because there may not always be many
            # print(json.dumps(tests))
            return Response({'success': serializer.data})
        except:
            return Response({'error': 'Something went wrong completing your request'})








        
        
        