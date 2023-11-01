from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

from profile_user.models import Profile

from .models import QuizVoice, VoiceSubject
from .serializers import QuizVoiceAnswerSerializer, QuizVoiceSerializer, VoiceSubjectSerializer
from django.core.paginator import Paginator, PageNotAnInteger



@api_view(['POST'])
def post_answer_voice_quiz(request):
    if request.method == 'POST':
        answers = request.data['answers']

        response_data_list = []

        for answer in answers:
            if request.user.is_authenticated:
                serializer = QuizVoiceAnswerSerializer(data=answer, context={"user": request.user})
                if serializer.is_valid():
                    serializer.save()

                    user_answer = serializer.validated_data['user_answer'].lower()

                    question = serializer.validated_data['question']

                    correct_answer = question.correct_answer.lower()

                    subject_id = question.subject.id if question.subject else None

                    try:
                        user_profile = Profile.objects.get(user=request.user)
                    except Profile.DoesNotExist:
                        user_profile = None

                    quiz_count = None

                    if user_answer == correct_answer:
                        if user_profile:
                            if user_profile.is_question_answered_correctly(question):
                                response_data = {"result": "You already answered this question correctly."}
                            else:
                                if subject_id is not None:
                                    quiz_count = QuizVoice.objects.filter(subject_id=subject_id).count()
                                    if quiz_count > 0:
                                        points_per_question = 100 / quiz_count
                                        if user_profile:
                                            user_profile.points += points_per_question
                            if user_profile:
                                user_profile.mark_question_answered_correctly(question)
                                user_profile.save()
                            response_data = {"result": "Correct!"}
                        else:
                            response_data = {"result": "Correct! (Not connected)"}
                    else:
                        if user_profile:
                            if user_profile.is_question_answered_correctly(question):
                                user_profile.points -= 5
                                user_profile.save()
                        response_data = {"result": "Wrong!"}

                    response_data['subject'] = subject_id

                    if subject_id is not None:
                        response_data['quiz_count'] = quiz_count

                    response_data_list.append(response_data)

                else:
                    response_data_list.append(serializer.errors)
            else:
                response_data = {"result": "Not connected"}
                response_data_list.append(response_data)

        return Response(response_data_list, status=200)


    


@api_view(['GET'])
def get_voices(request):
    if request.method == 'GET':
        voices = QuizVoice.objects.all()
        serializer = QuizVoiceSerializer(voices, many=True)
        return Response(serializer.data)
    


@api_view(["GET"])
def paged_voice_subjects(request, page):
    voices_per_page = 7

    all_voices = VoiceSubject.objects.order_by('date')

    paginator = Paginator(all_voices, voices_per_page)

    try:
        voices = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = VoiceSubjectSerializer(voices, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def voice_subjects_amount(request):
    voice_subjects_amount = VoiceSubject.objects.count()
    return Response({voice_subjects_amount}, status=status.HTTP_200_OK)
    


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
