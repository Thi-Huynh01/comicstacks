from rest_framework import serializers
from .models import Profile, Review
from comics.serializer import ComicSerializer

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = ProfileSerializer()
    comic = ComicSerializer()
    
    class Meta:
        model = Review
        fields = '__all__'