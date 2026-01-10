from rest_framework import serializers
from .models import Profile, Review, UserComic
from comics.serializers import ComicSerializer
from comics.models import Comic

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

class UserComicSerializer(serializers.ModelSerializer):
    comic = serializers.PrimaryKeyRelatedField(queryset=Comic.objects.all())
    '''comic_id = serializers.PrimaryKeyRelatedField(
        source='comic',
        queryset=Comic.objects.all(),
        write_only=True
    )
'''
    class Meta:
        model = UserComic
        fields = ['id','comic','status']