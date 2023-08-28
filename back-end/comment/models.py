from django.db import models
from blog.models import Blog
from django.contrib.auth.models import User

from profile_user.models import Profile



class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete = models.SET_NULL, null = True)
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True, blank = True)
    profile = models.ForeignKey(Profile, on_delete = models.SET_NULL, null = True, blank = True)
    comment = models.TextField(max_length = 120, null = True, blank = True)
    createdAt = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return str(self.comment)
