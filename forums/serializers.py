from rest_framework import serializers
from .models import Thread, ThreadCategory, ThreadReply

class ThreadCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreadCategory
        fields = '__all__'

class ThreadSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    category = ThreadCategorySerializer(read_only=True)
    
    class Meta:
        model = Thread
        fields = '__all__'

class ThreadReplySerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = ThreadReply
        fields = '__all__'
