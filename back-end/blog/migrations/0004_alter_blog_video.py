# Generated by Django 4.2.3 on 2023-08-24 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_alter_blog_video'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='video',
            field=models.FileField(upload_to=''),
        ),
    ]
