from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

from profile_user.models import Profile

from .models import QuizVoice, VoiceSubject
from .serializers import QuizVoiceSerializer, VoiceSubjectSerializer



@api_view(['GET'])
def get_voices(request):
    if request.method == 'GET':
        voices = QuizVoice.objects.all()
        serializer = QuizVoiceSerializer(voices, many=True)
        return Response(serializer.data)
    


@api_view(["GET"])
def get_voice_subjects(request):
    if request.method == "GET":
        subjects = VoiceSubject.objects.all()
        serializer = VoiceSubjectSerializer(subjects, many = True)
        return Response(serializer.data)
    


@api_view(["GET"])
def get_voice_subject(request, pk = -1):
    try:
        voice = VoiceSubject.objects.get(pk = pk)
        serializer = VoiceSubjectSerializer(voice)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except VoiceSubject.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    


@api_view(["GET"])
def get_voices_of_subject(request, pk):
    try:
        voice_subject = get_object_or_404(VoiceSubject, pk=pk)
        voices = QuizVoice.objects.filter(subject=voice_subject)
        serializer = QuizVoiceSerializer(voices, many=True)
        return Response(serializer.data)
    except VoiceSubject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
