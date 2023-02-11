from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('/typingtest', views.get_typing_test)
]