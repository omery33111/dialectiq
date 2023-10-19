from django.urls import path
from . import views



urlpatterns = [
    path('get_sentences/', views.get_sentences),

    path('get_sentence_subjects/', views.get_sentence_subjects),

    path('post_answer_sentence_quiz/', views.post_answer_sentence_quiz),

    path('get_sentence_subject/<int:pk>/', views.get_sentence_subject),
    
    path('get_sentences_of_subject/<int:pk>/', views.get_sentences_of_subject),
]