from django.db import models



class Blog(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField(max_length=400)
    video = models.FileField()
    date = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.title
    
    def formatted_date(self):
        return self.date.strftime("%Y-%m-%d %H:%M")
