from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from profile_user.models import Profile

from quiz_american.serializers import QuizAmericanAnswerSerializer, AmericanSubjectSerializer, GetQuizAmericanSerializer
from quiz_american.models import QuizAmerican, AmericanSubject



@permission_classes([IsAuthenticated])
@api_view(['POST'])
def post_answer_american_quiz(request):
    if request.method == 'POST':
        answers = request.data['answers']

        response_data_list = []

        for answer in answers:
            serializer = QuizAmericanAnswerSerializer(data=answer, context={"user": request.user})
            if serializer.is_valid():
                serializer.save()

                user_answer = serializer.validated_data['user_answer']

                question = serializer.validated_data['question']

                correct_answer = question.correct_answer

                user_profile = Profile.objects.get(user=request.user)

                if user_answer == correct_answer:
                    if user_profile.is_question_answered_correctly(question):
                        response_data = {"result": "You already answered this question correctly."}
                    else:
                        response_data = {"result": "Correct!"}
                        user_profile.points += 10
                        user_profile.mark_question_answered_correctly(question)
                        user_profile.save()
                else:
                    response_data = {"result": "Wrong!"}
                    user_profile.points -= 5
                    user_profile.save()

                response_data_list.append(response_data)

            else:
                response_data_list.append(serializer.errors)

        return Response(response_data_list, status=200)




@api_view(['GET'])
def get_americans(request):
    if request.method == 'GET':
        americans = QuizAmerican.objects.all()
        serializer = GetQuizAmericanSerializer(americans, many=True)
        return Response(serializer.data)
    


@api_view(["GET"])
def single_american(request, pk = -1):
    try:
        american = QuizAmerican.objects.get(pk = pk)
        serializer = GetQuizAmericanSerializer(american)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except QuizAmerican.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    


@api_view(["GET"])
def get_american_subjects(request):
    if request.method == "GET":
        subjects = AmericanSubject.objects.all()
        serializer = AmericanSubjectSerializer(subjects, many = True)
        return Response(serializer.data)
    


@api_view(["GET"])
def get_american_subject(request, pk = -1):
    try:
        american = AmericanSubject.objects.get(pk = pk)
        serializer = AmericanSubjectSerializer(american)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except AmericanSubject.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    

