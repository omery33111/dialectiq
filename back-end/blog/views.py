from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Blog
from .serializers import BlogSerializer



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
