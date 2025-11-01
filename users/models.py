from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from comics.models import Comic
from comicstack import settings
from django.utils import timezone

# Create your models here.

class Profile(AbstractUser):
    prof_desc = models.TextField(blank=True)
    favorite_comics = models.ManyToManyField('comics.Comic', blank=True, related_name='favorites')
    #prof_image = 

    def __str__(self):
        return self.username


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='comics')
    comic = models.ForeignKey(Comic, on_delete=models.SET_NULL, null=True, related_name='comics')
    subject = models.CharField(max_length=200)
    body = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    rating = models.PositiveSmallIntegerField(
        default=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Rating out of 5 stars"
    )
    # implement rating or star system

    def __str__(self):
        return self.subject
