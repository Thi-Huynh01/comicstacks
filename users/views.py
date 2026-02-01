from .models import Profile, Review, UserComic
from .serializers import ProfileSerializer, ReviewSerializer, UserComicSerializer, PublicUserSerializer
from rest_framework import viewsets, permissions, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from comics.models import Comic
from django.contrib.auth import get_user_model

# Create your views here.

User = get_user_model()

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'username'

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)

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

class AllReviewsListView(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class UserComicViewSet(viewsets.ModelViewSet):
    serializer_class = UserComicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = UserComic.objects.filter(user=self.request.user)
        comic_id = self.request.query_params.get('comic')
        status = self.request.query_params.get('status')

        if comic_id:
            queryset = queryset.filter(comic_id=comic_id)
        
        if status:
            queryset = queryset.filter(status=status)

        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PublicProfileView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer
    lookup_field = "id"

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context