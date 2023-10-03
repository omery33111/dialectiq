from django.urls import path
from . import views



urlpatterns = [
    path('profile', views.profile),
    path('get_profile/<int:pk>/', views.get_profile),
    path('user_update/<int:pk>/', views.user_update),

    path('my_id', views.my_id),

    path('user_blogcomments/<int:pk>/', views.user_blogcomments),
    path('user_answeredquizes/<int:pk>/', views.user_answered_quizes),
]
