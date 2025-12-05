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
    queryset = Thread.objects.all().order_by("-creation_date")
    serializer_class = ThreadSerializer

    # filter by categories. 
    #/api/forums/categories/<category_slug>/threads/
    def get_queryset(self):

        # default queryset
        queryset = Thread.objects.all().order_by("-creation_date")

        # set slug
        category_slug = self.kwargs.get("category_slug")

        # if category slug exists, filter
        if category_slug:
            queryset=queryset.filter(category__slug=category_slug)
        
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ThreadReplyViewSet(viewsets.ModelViewSet):
    queryset = ThreadReply.objects.all()
    serializer_class = ThreadReplySerializer

    def get_queryset(self):
        return ThreadReply.objects.filter(
            thread_id=self.kwargs['thread_pk']
        )
    
    def perform_create(self, serializer):
        serializer.save(
            thread_id=self.kwargs['thread_pk'],
            author=self.request.user
        )

