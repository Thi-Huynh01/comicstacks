from rest_framework import serializers
from .models import Profile, Review
from comics.serializers import ComicSerializer

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    #user = serializers.PrimaryKeyRelatedField(read_only=True)
    #comic = serializers.PrimaryKeyRelatedField(read_only=True)
    user = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'subject', 'body', 'rating', 'user', 'comic', 'date_posted']
        read_only_fields = ['user', 'comic', 'date_posted']
    
    def validate_rating(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value