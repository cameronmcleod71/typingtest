from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import SpecialTypingTest
from .utils import example_programming_typing_test, format_script
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib.auth.models import User
from django.contrib import auth
from django.utils.decorators import method_decorator
import json
from .serializers import CompletedTypingTestSerializer
from .models import CompletedTypingTest, ProgrammerTestScript
from timeit import default_timer as timer
import random
from pathlib import Path
import os

APP_DIR = Path(__file__).resolve().parent

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


class NewSpecialCTestScript(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, requests, format=None):
        new_test = SpecialTypingTest()
        new_test.generate_test()
        return Response(new_test.get_test(), status=status.HTTP_200_OK)


class NewProgrammerTestScript(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        test_lang = self.request.GET.get('language')

        #TODO would be faster if we stored different language types in different models
        script = ProgrammerTestScript.objects.filter(language=test_lang).order_by("?")[0].script
        formatted_script = format_script(script)

        script_dict = {
            "script": formatted_script,
            "lowest": 0,
            "isFull": True,
        }

        with open(os.path.join(APP_DIR,"leaderboard.json")) as leaderboard_json:
            data = json.load(leaderboard_json)
            script_dict["lowest"] = data["lowest_score"]
            script_dict["isFull"] = len(data["scores"]) < data["spots"]

        return Response(script_dict, status=status.HTTP_200_OK)
        
    

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
class SaveCompletedTypingTest(APIView):
    def post(self, request, format=None):
        data = self.request.data
        user = self.request.user

        data['owner'] = user.id # might not be a good practice to edit the request itself

        data['results'] = json.dumps(data['results'])
        for a in data['test']:
            a = json.dumps(a)
        data['test'] = json.dumps(data['test'])

        print(data["wpm"])

        new_highscore = False

        with open(os.path.join(APP_DIR,"leaderboard.json"),"r") as leaderboard_json:
            jsondata = json.load(leaderboard_json)
            if (len(jsondata["scores"]) < jsondata["spots"]) or (jsondata["lowest_score"] < data['wpm']):
                print("new highscore")
                new_highscore = True
                inserted = False
                for score_index in range(len(jsondata["scores"])):
                    if inserted:
                        break
                    if jsondata["scores"][score_index]["score"] < data["wpm"]:
                        jsondata["scores"].insert(score_index, {"name": user.username,"score": data["wpm"], "time_taken": data["time_taken"]})
                        inserted = True
                while len(jsondata["scores"]) > jsondata["spots"]: # remote any extra
                    jsondata["scores"].pop()

                jsondata["lowest_score"] = jsondata["scores"][-1]["score"] # reset the lowest score

                updated_leaderboard = json.dumps(jsondata, indent=4)
                with open(os.path.join(APP_DIR,"leaderboard.json"), "w") as outfile:
                    outfile.write(updated_leaderboard)


        serializer = CompletedTypingTestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'Test saved'})
        print(serializer.errors)
        return Response({'error': 'Test not valid'})
    
class GetCompletedTypingTest(APIView):
    def get(self,request, format=None):
        try:

            user = self.request.user
            tests = CompletedTypingTest.objects.filter(owner=user.id)
            serializer = CompletedTypingTestSerializer(tests, many=True) # may be a bug because there may not always be many
            # print(json.dumps(tests))
            return Response({'success': serializer.data})
        except:
            return Response({'error': 'Something went wrong completing your request'})
        
class GetLeaderboard(APIView):
    def get(self, request, format=None):
        try:
            with open(os.path.join(APP_DIR, "leaderboard.json"), "r") as leaderboard_json:
                leaderboard_data = json.load(leaderboard_json)
                leaderboard_scores = leaderboard_data["scores"]
                return Response({'success': leaderboard_scores})
        except:
            return Response({"error": "Something went wrong completing your request"})








        
        
        