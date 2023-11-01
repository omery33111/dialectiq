from django.urls import path
from . import views



urlpatterns = [
    path('get_voices/', views.get_voices),

    path('get_voice_subjects/', views.get_voice_subjects),

    path('post_answer_voice_quiz/', views.post_answer_voice_quiz),

    path('get_voices_of_subject/<int:pk>/', views.get_voices_of_subject),

    path('voice_subjects_amount/', views.voice_subjects_amount),
    path('paged_voice_subjects/<int:page>/', views.paged_voice_subjects),

    path('get_voice_subject/<int:pk>/', views.get_voice_subject),
]