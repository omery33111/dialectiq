# Generated by Django 4.2.3 on 2023-09-19 13:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AmericanSubject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='QuizAmerican',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=300)),
                ('answer1', models.CharField(max_length=150)),
                ('answer2', models.CharField(max_length=150)),
                ('answer3', models.CharField(max_length=150)),
                ('answer4', models.CharField(max_length=150)),
                ('correct_answer', models.IntegerField(choices=[(1, 'Answer 1'), (2, 'Answer 2'), (3, 'Answer 3'), (4, 'Answer 4')])),
                ('subject', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='quiz_american.americansubject')),
            ],
        ),
        migrations.CreateModel(
            name='QuizAmericanAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_answer', models.IntegerField(choices=[(1, 'Answer 1'), (2, 'Answer 2'), (3, 'Answer 3'), (4, 'Answer 4')])),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quiz_american.quizamerican')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
