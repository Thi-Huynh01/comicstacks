from rest_framework import serializers
from .models import *
from comics.serializer import ComicSerializer

class ProfileSerializer(serializers.ModelSerializer):
    class meta:
        model = Profile
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = ProfileSerializer()
    comic = ComicSerializer()
    
    class meta:
        model = Review
        fields = '__all__'