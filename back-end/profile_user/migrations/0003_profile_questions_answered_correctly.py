# Generated by Django 4.2.3 on 2023-09-26 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz_american', '0001_initial'),
        ('profile_user', '0002_profile_points'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='questions_answered_correctly',
            field=models.ManyToManyField(to='quiz_american.quizamerican'),
        ),
    ]