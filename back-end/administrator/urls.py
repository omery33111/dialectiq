from django.urls import path
from . import views



urlpatterns = [
    path('post_blog/', views.post_blog),
    path('delete_blog/<int:pk>/', views.delete_blog),
    path('patch_blog/<int:pk>/', views.patch_blog),

    path('americans_amount/', views.americans_amount),
    path('paged_americans/<int:page>/', views.paged_americans),
    path('post_american_quiz/', views.post_american_quiz),
    path('patch_american/<int:pk>/', views.patch_american),
    path('delete_american/<int:pk>/', views.delete_american),
    
    path('post_american_subject/', views.post_american_subject),
    path('patch_american_subject/<int:pk>/', views.patch_american_subject),
    path('delete_american_subject/<int:pk>/', views.delete_american_subject),
    
    path('sentences_amount/', views.sentences_amount),
    path('paged_sentences/<int:page>/', views.paged_sentences),
    path('post_sentence_quiz/', views.post_sentence_quiz),
    path('patch_sentence/<int:pk>/', views.patch_sentence),
    path('delete_sentence/<int:pk>/', views.delete_sentence),

    path('post_sentence_subject/', views.post_sentence_subject),
    path('patch_sentence_subject/<int:pk>/', views.patch_sentence_subject),
    path('delete_sentence_subject/<int:pk>/', views.delete_sentence_subject),

    path('voices_amount/', views.voices_amount),
    path('paged_voices/<int:page>/', views.paged_voices),
    path('post_voice_quiz/', views.post_voice_quiz),
    path('patch_voice/<int:pk>/', views.patch_voice),
    path('delete_voice/<int:pk>/', views.delete_voice),

    path('post_voice_subject/', views.post_voice_subject),
    path('patch_voice_subject/<int:pk>/', views.patch_voice_subject),
    path('delete_voice_subject/<int:pk>/', views.delete_voice_subject),

    path('get_americans_of_subject/<int:pk>/', views.get_americans_of_subject),

    path('update_user_profile/<int:pk>/', views.update_user_profile),

    path('callbacks_amount/', views.callbacks_amount),
    path('paged_callbacks/<int:page>/', views.paged_callbacks),
    path('delete_callback/<int:pk>/', views.delete_callback),
]
