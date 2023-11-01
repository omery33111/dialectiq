from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

from profile_user.models import Profile

from .models import QuizSentence, SentenceSubject
from .serializers import QuizSentenceAnswerSerializer, QuizSentenceSerializer, SentenceSubjectSerializer
from django.core.paginator import Paginator, PageNotAnInteger



@api_view(['POST'])
def post_answer_sentence_quiz(request):
    if request.method == 'POST':
        answers = request.data['answers']

        response_data_list = []

        for answer in answers:
            if request.user.is_authenticated:
                serializer = QuizSentenceAnswerSerializer(data=answer, context={"user": request.user})
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
                                    quiz_count = QuizSentence.objects.filter(subject_id=subject_id).count()
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
def get_sentences(request):
    if request.method == 'GET':
        sentences = QuizSentence.objects.all()
        serializer = QuizSentenceSerializer(sentences, many=True)
        return Response(serializer.data)
    


@api_view(["GET"])
def paged_sentence_subjects(request, page):
    sentences_per_page = 7

    all_sentences = SentenceSubject.objects.order_by('date')

    paginator = Paginator(all_sentences, sentences_per_page)

    try:
        sentences = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = SentenceSubjectSerializer(sentences, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def sentence_subjects_amount(request):
    sentence_subjects_amount = SentenceSubject.objects.count()
    return Response({sentence_subjects_amount}, status=status.HTTP_200_OK)



@api_view(["GET"])
def get_sentence_subjects(request):
    if request.method == "GET":
        subjects = SentenceSubject.objects.all()
        serializer = SentenceSubjectSerializer(subjects, many = True)
        return Response(serializer.data)
    


@api_view(["GET"])
def get_sentence_subject(request, pk = -1):
    try:
        sentence = SentenceSubject.objects.get(pk = pk)
        serializer = SentenceSubjectSerializer(sentence)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except SentenceSubject.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    


@api_view(["GET"])
def get_sentences_of_subject(request, pk):
    try:
        sentence_subject = get_object_or_404(SentenceSubject, pk=pk)
        sentences = QuizSentence.objects.filter(subject=sentence_subject)
        serializer = QuizSentenceSerializer(sentences, many=True)
        return Response(serializer.data)
    except SentenceSubject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)