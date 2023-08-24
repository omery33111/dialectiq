from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework import status

from blog.serializers import BlogSerializer
from blog.models import Blog



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff
    


@api_view(["GET"])
def single_blog(request, pk = -1):
    try:
        blog = Blog.objects.get(pk = pk)
        serializer = BlogSerializer(blog)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Blog.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    


@permission_classes([IsAuthenticated, IsStaff])
@api_view(['POST'])
def post_blog(request):
    if request.method == 'POST':
        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsStaff])
def delete_blog(request, pk=-1):
    if request.method == "DELETE":
        try:
            product = Blog.objects.get(pk=pk)
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Blog.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def patch_blog(request, pk = -1):
    if request.method == "PUT":
        blog = Blog.objects.get(pk = pk)
        serializer = BlogSerializer(blog, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
