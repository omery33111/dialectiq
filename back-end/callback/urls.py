from django.urls import path
from . import views



urlpatterns = [
    path('post_callback/', views.post_callback),
]