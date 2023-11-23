from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.contrib.auth.models import User




class AmericanSubject(models.Model):
    description = models.CharField(max_length = 800)
    subject_name = models.CharField(max_length = 50)
    subject_color = models.CharField(max_length = 50, default = "black")
    picture = models.ImageField()
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.subject_name


class QuizAmerican(models.Model):
    question = models.CharField(max_length = 300)
    answer1 = models.CharField(max_length = 150)
    answer2 = models.CharField(max_length = 150)
    answer3 = models.CharField(max_length = 150)
    answer4 = models.CharField(max_length = 150)
    correct_answer = models.IntegerField(choices=[(1, 'Answer 1'), (2, 'Answer 2'), (3, 'Answer 3'), (4, 'Answer 4')])
    subject = models.ForeignKey(AmericanSubject, on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.question


class QuizAmericanAnswer(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank = True)
    user_answer = models.IntegerField(choices=[(1, 'Answer 1'), (2, 'Answer 2'), (3, 'Answer 3'), (4, 'Answer 4')])
    question = models.ForeignKey(QuizAmerican, on_delete=models.CASCADE)
    is_correct = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add = True)

    
    def check_if_correct(self):
        return self.user_answer == self.question.correct_answer

    def save(self, *args, **kwargs):
        self.is_correct = self.check_if_correct()
        super(QuizAmericanAnswer, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.user)



@receiver(pre_delete, sender=AmericanSubject)
def delete_related_quizzes(sender, instance, **kwargs):
    related_quizzes = QuizAmerican.objects.filter(subject=instance)
    related_quizzes.delete()
