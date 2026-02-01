from rest_framework import serializers
from .models import Profile, Review, UserComic
from comics.serializers import ComicSerializer
from comics.models import Comic
from django.contrib.auth import get_user_model
from social.models import Follow

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
    #comic = serializers.PrimaryKeyRelatedField(queryset=Comic.objects.all())
    comic = ComicSerializer(read_only=True)

    comic_id = serializers.PrimaryKeyRelatedField(
        source='comic',
        queryset=Comic.objects.all(),
        write_only=True
    )
    class Meta:
        model = UserComic
        fields = ['id','comic','status','comic_id']


class PublicUserSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    comic_list = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = '__all__'
    
    def get_followers_count(self, obj):
        return Follow.objects.filter(following=obj).count()
    
    def get_following_count(self, obj):
        return Follow.objects.filter(follower=obj).count()

    def get_reviews(self, obj):
        return Review.objects.filter(user=obj).order_by("-date_posted")[:5].values(
            "id", "comic__title", "rating", "date_posted"
        )

    def get_is_following(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            from social.models import Follow
            return Follow.objects.filter(follower=request.user, following=obj).exists()
        return False
    
    def get_comic_list(self,obj):
        from comics.models import Comic
        from .models import UserComic

        comics = UserComic.objects.filter(user=obj).select_related("comic").order_by("-created_at")[:10]

        return [
            {
                "id": uc.comic.id,
                "title": uc.comic.title,
                "status": uc.status
            }
            for uc in comics
        ]