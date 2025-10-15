from django.db import models
from django.contrib.auth.models import AbstractUser
from comic.models import Comic

# Create your models here.

class Profile(AbstractUser):
    prof_desc = models.TextField(blank=True)
    #prof_image = 
    #favorite_comics =
    
    def __str__(self):
        return self.username


class Review(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True, related_name='comics')
    comic = models.ForeignKey(Comic, on_delete=models.SET_NULL, null=True, related_name='comics')
    subject = models.CharField(max_length=200)
    body = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject
