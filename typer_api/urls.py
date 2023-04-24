from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('typingtest', views.NewSpecialCTestScript.as_view()),
    path('login', views.LoginView.as_view()),
    path('csrf_token', views.GetCSRFToken.as_view()),
    path('register', views.SignupView.as_view()),
    path('auth', views.CheckAuthenticatedView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('savespecialchar', views.SaveSpecialCharTest.as_view()),
    path('getspecialchartest', views.GetPastSpecialCharTest.as_view()),
    path('deleteaccount', views.DeleteAccountView.as_view()),
    path('getprogrammingttest', views.NewProgrammerTestScript.as_view()),
]