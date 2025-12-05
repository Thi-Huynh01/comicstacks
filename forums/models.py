from django.db import models
from django.utils.text import slugify
from comicstack import settings

# Create your models here.

class ThreadCategory(models.Model):
    category = models.CharField(max_length=200)
    desc = models.TextField()
    slug = models.SlugField(unique=True, blank=True)

    class Meta:
        verbose_name = "Thread Category"
        verbose_name_plural = "Thread Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.category)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.category

class Thread(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='thread_owner')
    category = models.ForeignKey(ThreadCategory, on_delete=models.SET_NULL, null=True, related_name='thread_category')
    title = models.CharField(max_length=200)
    body = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ThreadReply(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='thread_reply_user')
    thread = models.ForeignKey(Thread, on_delete=models.SET_NULL, null=True, related_name='thread_reply')
    body = models.TextField()
    reply_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "Thread Reply"
        verbose_name_plural = "Thread Replies"

    def __str__(self):
        return self.body[0:50]


