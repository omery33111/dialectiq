from django.db import models
from django.contrib.auth.models import User



class VoiceSubject(models.Model):
    description = models.CharField(max_length = 800)
    subject_name = models.CharField(max_length = 50)
    picture = models.ImageField()

    def __str__(self):
        return self.subject_name


class QuizVoice(models.Model):
    question = models.FileField()
    correct_answer = models.CharField(max_length = 150)
    subject = models.ForeignKey(VoiceSubject, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.question


# class QuizSentenceAnswer(models.Model):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     user_answer = models.CharField(max_length = 150)
#     question = models.ForeignKey(QuizSentence, on_delete=models.CASCADE)

#     def __str__(self):
#         return str(self.user)
