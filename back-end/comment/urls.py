from django.urls import path
from . import views



urlpatterns = [
    path('delete_comment/<int:pk>/', views.delete_comment),
    path('put_comment/<int:pk>/', views.put_comment),
    path('single_comment/<int:pk>/', views.single_comment),
    path('get_comments/<int:pk>/', views.get_comments),
    path('post_comment/', views.post_comment),
]
