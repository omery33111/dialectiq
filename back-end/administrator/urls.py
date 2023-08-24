from django.urls import path
from . import views



urlpatterns = [
    path('post_blog/', views.post_blog),
    path('delete_blog/<int:pk>/', views.delete_blog),
    path('patch_blog/<int:pk>/', views.patch_blog),
    path('single_blog/<int:pk>/', views.single_blog),
]