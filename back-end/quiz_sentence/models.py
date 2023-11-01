from django.db import models
from django.contrib.auth.models import User



class SentenceSubject(models.Model):
    description = models.CharField(max_length = 800)
    subject_name = models.CharField(max_length = 50)
    picture = models.ImageField()
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.subject_name


class QuizSentence(models.Model):
    question = models.CharField(max_length = 300)
    correct_answer = models.CharField(max_length = 150)
    subject = models.ForeignKey(SentenceSubject, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.question


class QuizSentenceAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    user_answer = models.CharField(max_length = 150)
    question = models.ForeignKey(QuizSentence, on_delete=models.CASCADE)
    is_correct = models.BooleanField(default=False)

    
    def check_if_correct(self):
        return self.user_answer == self.question.correct_answer

    def save(self, *args, **kwargs):
        self.is_correct = self.check_if_correct()
        super(QuizSentenceAnswer, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.user)
