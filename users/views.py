from .models import Profile, Review
from .serializers import ProfileSerializer, ReviewSerializer
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import ListCreateAPIView
from comics.models import Comic

# Create your views here.
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        #print("KWARGS: ", self.kwargs)
        #comic_id = self.kwargs['comics']
        slug = self.kwargs.get("slug") or self.kwargs.get("slug_slug")
        return Review.objects.filter(comic__slug=slug)
                
    def perform_create(self, serializer):
        slug = self.kwargs.get("slug") or self.kwargs.get("slug_slug")
        comic = Comic.objects.get(slug=slug)
        serializer.save(user=self.request.user, comic=comic)
