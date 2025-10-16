from django.db import models
from django.utils.text import slugify
#from users.models import Review

# Create your models here.

# Publishers - DC, Marvel, Image, Darkhorse, etc

class Publisher(models.Model):
    name = models.CharField(max_length=200)
    desc = models.TextField()
    #top_rated_comics = 

    def __str__(self):
        return self.name

# Author
# TODO: implement top works by this author

class Author(models.Model):
    name = models.CharField(max_length=100)
    desc = models.TextField()
    #other_works =

    def __str__(self):
        return self.name


# Comics table
class Comic(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True, related_name='comics')
    publisher = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null= True, related_name='comics')
    #review = models.ForeignKey(Review, on_delete=models.SET_NULL, null= True, related_name='comics')
    issue_no = models.IntegerField()
    release_date = models.DateField(null=True, blank=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(f"{self.title}-{self.issue_no}")
            slug = base_slug
            counter = 1

            while Comic.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} (Issue {self.issue_no})"