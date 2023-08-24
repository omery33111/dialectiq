from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer



@api_view(['GET'])
def get_blog(request):
    if request.method == 'GET':
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)
