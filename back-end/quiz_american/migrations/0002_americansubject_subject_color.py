# Generated by Django 3.2.10 on 2023-11-22 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz_american', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='americansubject',
            name='subject_color',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
    ]