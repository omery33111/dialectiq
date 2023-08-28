from django.urls import path
from . import views



urlpatterns = [
    path('get_blogs/', views.get_blogs),
    path('single_blog/<int:pk>/', views.single_blog),
]
