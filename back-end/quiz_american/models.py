from django.db import models
from django.contrib.auth.models import User



class AmericanSubject(models.Model):
    subject_name = models.CharField(max_length = 30)

    def __str__(self):
        return self.subject_name
    


class QuizAmerican(models.Model):
    question = models.CharField(max_length=300)
    answer1 = models.CharField(max_length=150)
    answer2 = models.CharField(max_length=150)
    answer3 = models.CharField(max_length=150)
    answer4 = models.CharField(max_length=150)
    correct_answer = models.IntegerField(choices=[(1, 'Answer 1'), (2, 'Answer 2'), (3, 'Answer 3'), (4, 'Answer 4')])
    subject = models.ForeignKey(AmericanSubject, on_delete = models.SET_NULL, null = True, blank = True)

    def __str__(self):
        return self.question



class QuizAmericanAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    user_answer = models.IntegerField(choices=[(1, 'Answer 1'), (2, 'Answer 2'), (3, 'Answer 3'), (4, 'Answer 4')])
    question = models.ForeignKey(QuizAmerican, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)
    