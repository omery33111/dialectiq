from rest_framework import serializers
from .models import QuizSentence, SentenceSubject, QuizSentenceAnswer



class SentenceSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentenceSubject
        fields = '__all__'



class QuizSentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSentence
        fields = '__all__'


# class GetQuizAmericanSerializer(serializers.ModelSerializer):
#     subject = AmericanSubjectSerializer()
#     class Meta:
#         model = QuizAmerican
#         fields = '__all__'



class QuizSentenceAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSentenceAnswer
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['user']
        return QuizSentenceAnswer.objects.create(**validated_data, user = user)
