from django.urls import path
from . import views



urlpatterns = [
    path('get_blogs/', views.get_blogs),

    path('paged_blogs/<int:page>/', views.paged_blogs),

    path('blogs_amount/', views.blogs_amount),

    path('single_blog/<int:pk>/', views.single_blog),
]
