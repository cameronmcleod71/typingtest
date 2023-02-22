from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('typingtest', views.SpecialCharTest.as_view()),
    path('login', views.LoginView.as_view()),
    path('csrf_token', views.GetCSRFToken.as_view()),
    path('register', views.SignupView.as_view()),
]