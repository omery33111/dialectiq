from django.urls import path
from . import views



urlpatterns = [
    path('get_blogs/', views.get_blog),
]