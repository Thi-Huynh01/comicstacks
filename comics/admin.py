from django.contrib import admin
from .models import Comic, Author, Publisher
# Register your models here.

admin.site.register(Comic)
admin.site.register(Author)
admin.site.register(Publisher)
