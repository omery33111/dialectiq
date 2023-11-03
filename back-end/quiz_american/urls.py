from django.urls import path
from . import views



urlpatterns = [
    path('post_answer_american_quiz/', views.post_answer_american_quiz),
    path('get_americans/', views.get_americans),
    path('get_american_subjects/', views.get_american_subjects),
    path('american_subjects_amount/', views.american_subjects_amount),
    path('paged_american_subjects/<int:page>/', views.paged_american_subjects),
    path('get_american_subject/<int:pk>/', views.get_american_subject),
    path('single_american/<int:pk>/', views.single_american),

    path('get_right_americans/', views.get_right_americans),
]