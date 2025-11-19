from .models import Profile, Review
from .serializers import ProfileSerializer, ReviewSerializer
from rest_framework import viewsets, generics, permissions

# Create your views here.
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'subject'
'''
    def get_queryset(self):
        comic_id = self.kwargs['comics']
        return Review.objects.filter(comic_id=comic_id)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, comic_id=self.kwargs['comics'])
'''