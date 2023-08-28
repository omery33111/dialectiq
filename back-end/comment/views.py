from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Comment

from .serializers import CommentSerializer, GetCommentSerializer



@api_view(['GET'])
def get_comments(request, pk = -1):
    comments = Comment.objects.filter(blog_id = pk)
    serializer = GetCommentSerializer(comments, many = True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment(request):
    serializer = CommentSerializer(data = request.data, context = {"user": request.user})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



@api_view(["DELETE"])
def delete_comment(request, pk = -1):
    if request.method == "DELETE":
        try:
            comment = Comment.objects.get(pk=pk)
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
