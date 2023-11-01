from rest_framework import serializers
from .models import VoiceSubject, QuizVoice, QuizVoiceAnswer



class VoiceSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceSubject
        fields = '__all__'



class QuizVoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizVoice
        fields = '__all__'



class QuizVoiceAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizVoiceAnswer
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['user']
        return QuizVoiceAnswer.objects.create(**validated_data, user = user)
