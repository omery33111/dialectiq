from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator, PageNotAnInteger
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework import status

from quiz_sentence.serializers import QuizSentenceSerializer, SentenceSubjectSerializer
from quiz_sentence.models import QuizSentence, SentenceSubject

from quiz_american.serializers import QuizAmericanSerializer, AmericanSubjectSerializer
from quiz_american.models import QuizAmerican, AmericanSubject

from blog.serializers import BlogSerializer
from blog.models import Blog

from quiz_voice.serializers import QuizVoiceSerializer, VoiceSubjectSerializer
from quiz_voice.models import QuizVoice, VoiceSubject

from profile_user.serializers import ProfileSerializer
from profile_user.models import Profile

from callback.serializers import CallbackSerializer
from callback.models import Callback




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



# ~~~~~~~~~~~~~~~~~~~~~~~~~ COMPLETE THE SENTENCE QUIZ START ~~~~~~~~~~~~~~~~~~~~~~~~~ #
@permission_classes([IsAuthenticated, IsStaff])
@api_view(['POST'])
def post_sentence_quiz(request):
    if request.method == 'POST':
        serializer = QuizSentenceSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsStaff])
def delete_sentence(request, pk = -1):
    if request.method == "DELETE":
        try:
            sentence = QuizSentence.objects.get(pk = pk)
            sentence.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except QuizSentence.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def patch_sentence(request, pk = -1):
    if request.method == "PUT":
        sentence = QuizSentence.objects.get(pk = pk)
        serializer = QuizSentenceSerializer(sentence, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
# ~~~~~~~~~~~~~~~~~~~~~~~~~ COMPLETE THE SENTENCE QUIZ END ~~~~~~~~~~~~~~~~~~~~~~~~~ #



# ~~~~~~~~~~~~~~~~~~~~~~~~~ COMPLETE THE SENTENCE SUBJECT START ~~~~~~~~~~~~~~~~~~~~~~~~~ #
@api_view(['POST'])
def post_sentence_subject(request):
    if request.method == 'POST':
        serializer = SentenceSubjectSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def patch_sentence_subject(request, pk = -1):
    if request.method == "PUT":
        subject = SentenceSubject.objects.get(pk = pk)
        serializer = SentenceSubjectSerializer(subject, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsStaff])
def delete_sentence_subject(request, pk = -1):
    if request.method == "DELETE":
        try:
            sentence_subject = SentenceSubject.objects.get(pk = pk)
            sentence_subject.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except SentenceSubject.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
# ~~~~~~~~~~~~~~~~~~~~~~~~~ COMPLETE THE SENTENCE SUBJECT END ~~~~~~~~~~~~~~~~~~~~~~~~~ #



# ~~~~~~~~~~~~~~~~~~~~~~~~~ VOICE QUIZ START ~~~~~~~~~~~~~~~~~~~~~~~~~ #
@permission_classes([IsAuthenticated, IsStaff])
@api_view(['POST'])
def post_voice_quiz(request):
    if request.method == 'POST':
        serializer = QuizVoiceSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsStaff])
def delete_voice(request, pk = -1):
    if request.method == "DELETE":
        try:
            voice = QuizVoice.objects.get(pk = pk)
            voice.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except QuizVoice.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def patch_voice(request, pk = -1):
    if request.method == "PUT":
        voice = QuizVoice.objects.get(pk = pk)
        serializer = QuizVoiceSerializer(voice, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
# ~~~~~~~~~~~~~~~~~~~~~~~~~ VOICE QUIZ END ~~~~~~~~~~~~~~~~~~~~~~~~~ #



# ~~~~~~~~~~~~~~~~~~~~~~~~~ VOICE QUIZ SUBJECT START ~~~~~~~~~~~~~~~~~~~~~~~~~ #
@api_view(['POST'])
def post_voice_subject(request):
    if request.method == 'POST':
        serializer = VoiceSubjectSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def patch_voice_subject(request, pk = -1):
    if request.method == "PUT":
        subject = VoiceSubject.objects.get(pk = pk)
        serializer = VoiceSubjectSerializer(subject, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsStaff])
def delete_voice_subject(request, pk = -1):
    if request.method == "DELETE":
        try:
            voice_subject = VoiceSubject.objects.get(pk = pk)
            voice_subject.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except VoiceSubject.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
# ~~~~~~~~~~~~~~~~~~~~~~~~~ VOICE QUIZ SUBJECT END ~~~~~~~~~~~~~~~~~~~~~~~~~ #



@api_view(["GET"])
def get_americans_of_subject(request, pk):
    try:
        american_subject = get_object_or_404(AmericanSubject, pk=pk)
        americans = QuizAmerican.objects.filter(subject=american_subject)
        serializer = QuizAmericanSerializer(americans, many=True)
        return Response(serializer.data)
    except AmericanSubject.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsStaff])
def update_user_profile(request, pk = -1):
    if request.method == "PUT":
        profile = Profile.objects.get(pk = pk)
        serializer = ProfileSerializer(profile, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)



@api_view(["GET"])
def paged_americans(request, page):
    americans_per_page = 10

    all_americans = QuizAmerican.objects.order_by('question')

    paginator = Paginator(all_americans, americans_per_page)

    try:
        americans = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = QuizAmericanSerializer(americans, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def americans_amount(request):
    americans_amount = QuizAmerican.objects.count()
    return Response({americans_amount}, status=status.HTTP_200_OK)



@api_view(["GET"])
def paged_sentences(request, page):
    sentences_per_page = 10

    all_sentences = QuizSentence.objects.order_by('question')

    paginator = Paginator(all_sentences, sentences_per_page)

    try:
        sentences = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = QuizSentenceSerializer(sentences, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def sentences_amount(request):
    sentences_amount = QuizSentence.objects.count()
    return Response({sentences_amount}, status=status.HTTP_200_OK)



@api_view(["GET"])
def paged_voices(request, page):
    voices_per_page = 10

    all_voices = QuizVoice.objects.order_by('question')

    paginator = Paginator(all_voices, voices_per_page)

    try:
        voices = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = QuizVoiceSerializer(voices, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def voices_amount(request):
    voices_amount = QuizVoice.objects.count()
    return Response({voices_amount}, status=status.HTTP_200_OK)



@api_view(["GET"])
def paged_callbacks(request, page):
    callbacks_per_page = 10

    all_callbacks = Callback.objects.order_by('date')

    paginator = Paginator(all_callbacks, callbacks_per_page)

    try:
        callbacks = paginator.page(page)
    except PageNotAnInteger:
        return Response({"error": "Invalid page number."}, status=400)

    serializer = CallbackSerializer(callbacks, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def callbacks_amount(request):
    callbacks_amount = Callback.objects.count()
    return Response({callbacks_amount}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated, IsStaff])
@api_view(["DELETE"])
def delete_callback(request, pk = -1):
    if request.method == "DELETE":
        try:
            callback = Callback.objects.get(pk = pk)
            callback.delete()
            return Response(status = status.HTTP_204_NO_CONTENT)
        except Callback.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)
