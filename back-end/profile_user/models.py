from django.db import models
from django.contrib.auth.models import User
from quiz_american.models import QuizAmerican
from quiz_sentence.models import QuizSentence
from quiz_voice.models import QuizVoice

class ProfileManager(models.Manager):
    def get_or_create_profile(self, user):
        try:
            profile = self.get(user=user)
        except Profile.DoesNotExist:
            profile = self.create(user=user)
        return profile

class Profile(models.Model):
    profile_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    first_name = models.CharField(max_length=20, default="UNKNOWN")
    last_name = models.CharField(max_length=20, blank=True, null=True, default="UNKNOWN")
    bio = models.TextField(max_length=350, blank=True, null=True, default="I'm New!")
    location = models.CharField(max_length=30, blank=True, null=True, default="UNKNOWN")
    picture = models.ImageField(blank=True, null=True, default="defaultprofile.png")
    points = models.IntegerField(default=100)
    questions_answered_correctly = models.ManyToManyField(QuizAmerican, blank=True, related_name="correctly_answered_americans")
    questions_answered_correctly_sentencequiz = models.ManyToManyField(QuizSentence, blank=True, related_name="correctly_answered_sentences")
    questions_answered_correctly_voicequiz = models.ManyToManyField(QuizVoice, blank=True, related_name="correctly_answered_voices")
    objects = ProfileManager()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)

    def mark_question_answered_correctly(self, question):
        if isinstance(question, QuizAmerican):
            self.questions_answered_correctly.add(question)
        elif isinstance(question, QuizSentence):
            self.questions_answered_correctly_sentencequiz.add(question)
        elif isinstance(question, QuizVoice):
            self.questions_answered_correctly_voicequiz.add(question)
        self.save()

    def is_question_answered_correctly(self, question):
        if isinstance(question, QuizAmerican):
            return self.questions_answered_correctly.filter(pk=question.pk).exists()
        elif isinstance(question, QuizSentence):
            return self.questions_answered_correctly_sentencequiz.filter(pk=question.pk).exists()
        elif isinstance(question, QuizVoice):
            return self.questions_answered_correctly_voicequiz.filter(pk=question.pk).exists()

    def save(self, *args, **kwargs):
        if self.points < 0:
            self.points = 0
        super(Profile, self).save(*args, **kwargs)
