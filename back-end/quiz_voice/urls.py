from django.urls import path
from . import views



urlpatterns = [
    path('get_voices/', views.get_voices),

    path('get_voice_subjects/', views.get_voice_subjects),

    path('get_voices_of_subject/<int:pk>/', views.get_voices_of_subject),

    path('get_voice_subject/<int:pk>/', views.get_voice_subject),
]