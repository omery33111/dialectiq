from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework import status

from quiz_american.serializers import QuizAmericanSerializer, AmericanSubjectSerializer
from quiz_american.models import QuizAmerican, AmericanSubject

from blog.serializers import BlogSerializer
from blog.models import Blog



class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff
    

# ~~~~~~~~~~~~~~~~~~~~~~~~~ BLOG START ~~~~~~~~~~~~~~~~~~~~~~~~~ #
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
# ~~~~~~~~~~~~~~~~~~~~~~~~~ BLOG END ~~~~~~~~~~~~~~~~~~~~~~~~~ #



# ~~~~~~~~~~~~~~~~~~~~~~~~~ AMERICAN QUIZ START ~~~~~~~~~~~~~~~~~~~~~~~~~ #
@permission_classes([IsAuthenticated, IsStaff])
@api_view(['POST'])
def post_american_quiz(request):
    if request.method == 'POST':
        serializer = QuizAmericanSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsStaff])
def delete_american(request, pk = -1):
    if request.method == "DELETE":
        try:
            american = QuizAmerican.objects.get(pk = pk)
            american.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except QuizAmerican.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def patch_american(request, pk = -1):
    if request.method == "PUT":
        american = QuizAmerican.objects.get(pk = pk)
        serializer = QuizAmericanSerializer(american, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
# ~~~~~~~~~~~~~~~~~~~~~~~~~ AMERICAN QUIZ END ~~~~~~~~~~~~~~~~~~~~~~~~~ #



# ~~~~~~~~~~~~~~~~~~~~~~~~~ AMERICAN QUIZ SUBJECT START ~~~~~~~~~~~~~~~~~~~~~~~~~ #
@api_view(['POST'])
def post_american_subject(request):
    if request.method == 'POST':
        serializer = AmericanSubjectSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def patch_american_subject(request, pk = -1):
    if request.method == "PUT":
        subject = AmericanSubject.objects.get(pk = pk)
        serializer = AmericanSubjectSerializer(subject, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsStaff])
def delete_american_subject(request, pk = -1):
    if request.method == "DELETE":
        try:
            american_subject = AmericanSubject.objects.get(pk = pk)
            american_subject.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except AmericanSubject.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
# ~~~~~~~~~~~~~~~~~~~~~~~~~ AMERICAN QUIZ SUBJECT START ~~~~~~~~~~~~~~~~~~~~~~~~~ #



@api_view(["GET"])
def get_americans_of_subject(request, pk):
    try:
        american_subject = get_object_or_404(AmericanSubject, pk=pk)
        americans = QuizAmerican.objects.filter(subject=american_subject)
        serializer = QuizAmericanSerializer(americans, many=True)
        return Response(serializer.data)
    except AmericanSubject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
