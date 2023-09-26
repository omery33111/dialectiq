from django.urls import path
from . import views



urlpatterns = [
    path('post_blog/', views.post_blog),
    path('delete_blog/<int:pk>/', views.delete_blog),
    path('patch_blog/<int:pk>/', views.patch_blog),

    path('post_american_quiz/', views.post_american_quiz),
    path('patch_american/<int:pk>/', views.patch_american),
    path('delete_american/<int:pk>/', views.delete_american),

    path('post_american_subject/', views.post_american_subject),
    path('patch_american_subject/<int:pk>/', views.patch_american_subject),
    path('delete_american_subject/<int:pk>/', views.delete_american_subject),

    path('get_americans_of_subject/<int:pk>/', views.get_americans_of_subject),
]