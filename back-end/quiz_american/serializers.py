from rest_framework import serializers
from .models import QuizAmerican, QuizAmericanAnswer, AmericanSubject



class AmericanSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmericanSubject
        fields = '__all__'



class QuizAmericanSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAmerican
        fields = '__all__'


class GetQuizAmericanSerializer(serializers.ModelSerializer):
    subject = AmericanSubjectSerializer()
    class Meta:
        model = QuizAmerican
        fields = '__all__'



class QuizAmericanAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAmericanAnswer
        fields = '__all__'
    
    def create(self, validated_data):
        user = self.context['user']
        return QuizAmericanAnswer.objects.create(**validated_data, user = user)



class GetQuizAmericanAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAmericanAnswer
        fields = '__all__'
    