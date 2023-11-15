from django.contrib.auth.models import User
from django.core.paginator import Paginator, PageNotAnInteger

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from profile_user.serializers import ProfileSerializer

from .models import Profile

from comment.models import Comment

from quiz_american.serializers import QuizAmericanAnswer
from quiz_american.models import AmericanSubject

from quiz_sentence.serializers import QuizSentenceAnswer
from quiz_sentence.models import SentenceSubject

from quiz_voice.serializers import QuizVoiceAnswer
from quiz_voice.models import VoiceSubject



# ------------------------- PROFILE START ------------------------- #
@api_view(["GET"])
def my_id(request):
    if request.method == "GET":
        user = request.user
        if user.is_authenticated:
            return Response({user.id})
        else:
            return Response({-1})


    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    if request.method == "GET":
        user = request.user
        my_profile = Profile.objects.get(user = user)
        serilaizer = ProfileSerializer(my_profile, many = False)
        return Response(serilaizer.data)
    


@api_view(["GET"])
def get_profile(request, pk = -1):
    try:
        profile = Profile.objects.get(pk = pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except Profile.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)



@api_view(["GET"])
def user_blogcomments(request, pk=-1):
    try:
        # Retrieve comments without requiring authentication
        comments = Comment.objects.all()  # Fetch all comments

        blogs = set()
        blog_comments_map = {}

        for comment in comments:
            blog = comment.blog
            if blog:
                blogs.add(blog)

                if blog.id not in blog_comments_map:
                    blog_comments_map[blog.id] = {
                        "id": blog.id,
                        "blog_info": {
                            "title": blog.title,
                            "description": blog.description,
                            "picture": blog.picture.url if blog.picture else None,
                            "date": blog.date,
                        },
                        "comments": [],
                    }

                blog_comments_map[blog.id]["comments"].append(comment.comment)

        serialized_blogs = []
        for blog_id, blog_data in blog_comments_map.items():
            serialized_blogs.append({
                "id": blog_id,
                "blog_info": blog_data["blog_info"],
                "comments": blog_data["comments"],
            })

        return Response(serialized_blogs, status=status.HTTP_200_OK)

    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def user_answered_quizes(request, pk=-1):
    user_id = pk

    answered_american_subject_ids = QuizAmericanAnswer.objects.filter(user_id=user_id).values_list('question__subject__id', flat=True)
    answered_sentence_subject_ids = QuizSentenceAnswer.objects.filter(user_id=user_id).values_list('question__subject__id', flat=True)
    answered_voice_subject_ids = QuizVoiceAnswer.objects.filter(user_id=user_id).values_list('question__subject__id', flat=True)

    user_quizes = AmericanSubject.objects.filter(id__in=answered_american_subject_ids).distinct()
    user_quizes_sentence = SentenceSubject.objects.filter(id__in=answered_sentence_subject_ids).distinct()
    user_quizes_voice = VoiceSubject.objects.filter(id__in=answered_voice_subject_ids).distinct()

    all_subjects = list(user_quizes) + list(user_quizes_sentence) + list(user_quizes_voice)

    once_answered_subject_data = []
    for subject in all_subjects:
        once_answered_subject_data.append({
            'id': subject.id,
            'description': subject.description,
            'subject_name': subject.subject_name,
            'picture': subject.picture.url if subject.picture else None,
        })

    return Response(once_answered_subject_data, status=status.HTTP_200_OK)


    


@api_view(["PUT"])
def user_update(request, pk = -1):
    if request.method == "PUT":
        profile = Profile.objects.get(pk = pk)
        serializer = ProfileSerializer(profile, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


@api_view(["GET"])
def forum_profiles(request, page):
    profiles_per_page = 8

    all_profiles = Profile.objects.order_by('-points')

    paginator = Paginator(all_profiles, profiles_per_page)

    try:
        profiles = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = ProfileSerializer(profiles, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def profiles_amount(request):
    profiles_amount = Profile.objects.count()
    return Response({profiles_amount}, status=status.HTTP_200_OK)



@api_view(["GET"])
def search_profile(request):
    first_name = request.GET.get("user_name", "")
    profiles = Profile.objects.filter(first_name__startswith=first_name)
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
# ------------------------- PROFILE END ------------------------- #
