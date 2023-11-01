from django.db import models



class Callback(models.Model):
    name = models.CharField(max_length = 30)
    email = models.CharField(max_length = 50)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
