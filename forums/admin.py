from django.contrib import admin
from .models import Thread, ThreadCategory, ThreadReply
# Register your models here.

admin.site.register(ThreadCategory)
admin.site.register(Thread)
admin.site.register(ThreadReply)