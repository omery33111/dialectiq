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



# ------------------------- PROFILE START ------------------------- #
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_id(request):
    if request.method == "GET":
        user = request.user
        if user.is_authenticated:
            return Response({user.id})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


    
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
@permission_classes([IsAuthenticated])
def user_blogcomments(request, pk=-1):
    try:
        user = request.user  # Get the authenticated user
        comments = Comment.objects.filter(user=user)
        blogs = set()

        blog_comments_map = {}

        for comment in comments:
            blog = comment.blog
            if blog:
                # If the user has commented on this blog, add it to the set of unique blogs
                blogs.add(blog)

                # Check if the blog is already in the dictionary, if not, initialize it
                if blog.id not in blog_comments_map:
                    blog_comments_map[blog.id] = {
                        "id": blog.id,  # Include the ID of the blog
                        "blog_info": {
                            "title": blog.title,
                            "description": blog.description,
                            "picture": blog.picture.url,  # You can customize this based on your needs
                            "date": blog.date,
                        },
                        "comments": [],
                    }

                # Add the user's comment to the comments list for this blog
                blog_comments_map[blog.id]["comments"].append(comment.comment)

        # Serialize the unique blogs along with their information and user's comments
        serialized_blogs = []
        for blog_id, blog_data in blog_comments_map.items():
            serialized_blogs.append({
                "id": blog_id,  # Include the ID of the blog
                "blog_info": blog_data["blog_info"],
                "comments": blog_data["comments"],
            })

        # Return the serialized_blogs as an array
        return Response(serialized_blogs, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_answered_quizes(request, pk=-1):
    user_id = pk

    # Get all the AmericanSubject IDs that the user has answered
    answered_american_subject_ids = QuizAmericanAnswer.objects.filter(user_id=user_id).values_list('question__subject__id', flat=True)

    # Get all the SentenceSubject IDs that the user has answered once
    answered_sentence_subject_ids = QuizSentenceAnswer.objects.filter(user_id=user_id).values_list('question__subject__id', flat=True)

    # Get all the AmericanSubject objects that the user has answered once
    user_quizes = AmericanSubject.objects.filter(id__in=answered_american_subject_ids).distinct()

    # Get all the SentenceSubject objects that the user has answered once
    user_quizes_sentence = SentenceSubject.objects.filter(id__in=answered_sentence_subject_ids).distinct()

    # Combine the two querysets into a single queryset
    user_quizes = user_quizes.union(user_quizes_sentence)

    # Get the descriptions, subject names, and pictures of the once answered AmericanSubject objects
    once_answered_american_subject_data = []
    for american_subject in user_quizes:
        once_answered_american_subject_data.append({
            'id': american_subject.id,  # Add the 'id' field here
            'description': american_subject.description,
            'subject_name': american_subject.subject_name,
            'picture': american_subject.picture.url,
        })

    # Return the once answered AmericanSubject data
    try:
        return Response(once_answered_american_subject_data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    


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
def forum_profiles(request):
    # Define the number of profiles to load per page
    profiles_per_page = 8

    # Get the page number from the query parameter
    page = request.GET.get("page", 1)

    # Query all profiles and order them by a field (e.g., you can order by the date field)
    all_profiles = Profile.objects.order_by("date")

    # Use Django Paginator to paginate the profiles
    paginator = Paginator(all_profiles, profiles_per_page)

    try:
        profiles = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    # Serialize the profiles to JSON using the ProfileSerializer
    serializer = ProfileSerializer(profiles, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def search_profile(request):
    first_name = request.GET.get("first_name", None)

    # Check if the first_name parameter is None
    if first_name is None:
        return Response({"error": "The first_name parameter is required."})

    # Filter the Profile objects by first_name
    profiles = Profile.objects.filter(first_name__icontains=first_name)

    # Serialize the Profile objects
    serializer = ProfileSerializer(profiles, many=True)

    # Return the serialized Profile objects
    return Response(serializer.data, status=status.HTTP_200_OK)

# ------------------------- PROFILE END ------------------------- #
