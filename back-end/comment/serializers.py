from rest_framework import serializers
from .models import Comment
from profile_user.serializers import ProfileSerializer
from blog.serializers import BlogSerializer



class GetCommentSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = Comment
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['user']
        return Comment.objects.create(**validated_data, user = user)
    


class GetUserCommentsSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    blog = BlogSerializer()

    class Meta:
        model = Comment
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['user']
        return Comment.objects.create(**validated_data, user = user)
    



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['user']
        return Comment.objects.create(**validated_data, user = user)
