from django.urls import path
from . import views



urlpatterns = [
    path('profile', views.profile),
    path('profile_update', views.profile_update),
    path('get_profile/<int:pk>/', views.get_profile),
]
