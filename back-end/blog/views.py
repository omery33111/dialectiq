from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Blog
from .serializers import BlogSerializer
from django.core.paginator import Paginator, PageNotAnInteger



@api_view(["GET"])
def more_blogs(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            blogs_per_page = 10
        else:
            blogs_per_page = 5

        all_blogs = Blog.objects.order_by('-date')[:blogs_per_page]
        serializer = BlogSerializer(all_blogs, many=True)

        return Response(serializer.data)
    


@api_view(["GET"])
def paged_blogs(request, page):
    blogs_per_page = 5

    all_blogs = Blog.objects.order_by('date')

    if request.user.is_authenticated:
        paginator = Paginator(all_blogs, blogs_per_page)
    else:
        # If the user is not authenticated, show only the first page
        paginator = Paginator(all_blogs[:blogs_per_page], blogs_per_page)

    try:
        blogs = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = BlogSerializer(blogs, many=True)

    return Response(serializer.data)
    



@api_view(["GET"])
def blogs_amount(request):
    blogs_amount = Blog.objects.count()
    return Response({blogs_amount}, status=status.HTTP_200_OK)



@api_view(['GET'])
def get_blogs(request):
    if request.method == 'GET':
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)



@api_view(["GET"])
def single_blog(request, pk = -1):
    try:
        blog = Blog.objects.get(pk = pk)
        serializer = BlogSerializer(blog)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Blog.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
