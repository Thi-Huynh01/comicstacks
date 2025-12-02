from .models import ThreadReply, Thread, ThreadCategory
from .serializers import ThreadReplySerializer, ThreadSerializer, ThreadCategorySerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.

class ThreadCategoryViewSet(viewsets.ModelViewSet):
    queryset = ThreadCategory.objects.all()
    serializer_class = ThreadCategorySerializer
    lookup_field = "slug"

class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

class ThreadReplyViewSet(viewsets.ModelViewSet):
    queryset = ThreadReply.objects.all()
    serializer_class = ThreadReplySerializer
