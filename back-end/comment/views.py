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



@api_view(["GET"])
def single_comment(request, pk = -1):
    try:
        comment = Comment.objects.get(pk = pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Comment.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment(request):
    serializer = CommentSerializer(data = request.data, context = {"user": request.user})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_comment(request, pk=-1):
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Check if the authenticated user is the owner of the comment
    if comment.user != request.user:
        return Response({"detail": "You do not have permission to delete this comment."},
                        status=status.HTTP_403_FORBIDDEN)

    if request.method == "DELETE":
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def put_comment(request, pk=-1):
    try:
        comment = Comment.objects.get(pk=pk)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Check if the authenticated user is the owner of the comment
    if comment.user != request.user:
        return Response({"detail": "You do not have permission to edit this comment."},
                        status=status.HTTP_403_FORBIDDEN)

    if request.method == "PUT":
        serializer = CommentSerializer(comment, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
