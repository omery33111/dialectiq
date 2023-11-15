from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from profile_user.models import Profile

from quiz_american.serializers import QuizAmericanAnswerSerializer, AmericanSubjectSerializer, GetQuizAmericanSerializer
from quiz_american.models import QuizAmerican, AmericanSubject, QuizAmericanAnswer
from django.core.paginator import Paginator, PageNotAnInteger
from django.db.models import Subquery, Max



@api_view(['POST'])
def post_answer_american_quiz(request):
    if request.method == 'POST':
        answers = request.data['answers']

        response_data_list = []

        for answer in answers:
            if request.user.is_authenticated:
                serializer = QuizAmericanAnswerSerializer(data=answer, context={"user": request.user})
                if serializer.is_valid():
                    serializer.save()

                    user_answer = serializer.validated_data['user_answer']

                    question = serializer.validated_data['question']

                    correct_answer = question.correct_answer

                    # Access the subject of the question
                    subject_id = question.subject.id if question.subject else None

                    try:
                        user_profile = Profile.objects.get(user=request.user)
                    except Profile.DoesNotExist:
                        user_profile = None

                    # Initialize quiz_count
                    quiz_count = None

                    if user_answer == correct_answer:
                        if user_profile:
                            if user_profile.is_question_answered_correctly(question):
                                response_data = {"result": "You already answered this question correctly."}
                            else:
                                # Calculate points per question based on quiz_count
                                if subject_id is not None:
                                    quiz_count = QuizAmerican.objects.filter(subject_id=subject_id).count()
                                    if quiz_count > 0:
                                        points_per_question = 100 / quiz_count
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
    



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_right_americans(request):
    if request.method == 'GET':
        # Create an empty list to store the result
        result_list = []

        # Get the currently authenticated user
        current_user = request.user

        # Get all the correct answers for the most recent subject for the current user
        current_subject = AmericanSubject.objects.order_by('-date').first()

        # Create a subquery to get unique question IDs for the current user's correct answers
        unique_question_ids_subquery = QuizAmericanAnswer.objects.filter(
            user=current_user,  # Filter by the current user
            question__subject=current_subject,
            is_correct=True
        ).values('question').annotate(max_date=Max('date')).values('max_date')

        # Fetch correct answers based on unique question IDs for the current user
        correct_answers = QuizAmericanAnswer.objects.filter(
            user=current_user,  # Filter by the current user
            question__subject=current_subject,
            is_correct=True,
            date__in=Subquery(unique_question_ids_subquery)
        )

        # Create the desired structure for each correct answer
        for answer in correct_answers:
            result_item = {
                "id": answer.question.id,  # General ID (not answer ID)
                "question": answer.question.question,  # Question itself
                "user_answer": answer.get_user_answer_display(),  # Get the user's answer text
            }
            result_list.append(result_item)

        # Return the list of correct answers in the desired format
        return Response(result_list, status=status.HTTP_200_OK)



@api_view(["GET"])
def get_american_subjects(request):
    if request.method == "GET":
        subjects = AmericanSubject.objects.all()
        serializer = AmericanSubjectSerializer(subjects, many = True)
        return Response(serializer.data)
    

@api_view(["GET"])
def paged_american_subjects(request, page):
    americans_per_page = 7

    all_americans = AmericanSubject.objects.order_by('date')

    paginator = Paginator(all_americans, americans_per_page)

    try:
        americans = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = AmericanSubjectSerializer(americans, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def american_subjects_amount(request):
    american_subjects_amount = AmericanSubject.objects.count()
    return Response({american_subjects_amount}, status=status.HTTP_200_OK)
    


@api_view(["GET"])
def get_american_subject(request, pk = -1):
    try:
        american = AmericanSubject.objects.get(pk = pk)
        serializer = AmericanSubjectSerializer(american)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except AmericanSubject.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    


