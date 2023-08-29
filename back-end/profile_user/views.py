from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from profile_user.serializers import ProfileSerializer

from .models import Profile



# ------------------------- PROFILE START ------------------------- #
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



@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def profile_update(request):
    if request.method == "PUT":
        user = request.user
        my_user = Profile.objects.get(user = user)
        serializer = ProfileSerializer(my_user, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
# ------------------------- PROFILE END ------------------------- #
