from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from .models import Follow

# Create your views here

User = get_user_model()

class FollowToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        target = get_object_or_404(User, id=user_id)

        if target == request.user:
            return Response({"detail": "You cannot follow yourself."}, status=400)
        
        follow, created = Follow.objects.get_or_create(
            follower=request.user,
            following=target
        )

        if not created:
            follow.delete()
            return Response({"following": False})
        
        return Response({"following": True})

class FollowingListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        follows = Follow.objects.filter(follower_id=user_id).select_related("following")
        data = [
            {"id": f.following.id, "username": f.following.username}
            for f in follows
        ]

        return Response(data)
    
class FollowersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        follows = Follow.objects.filter(follower_id=user_id).select_related("follower")
        data = [
            {"id": f.follower.id, "username": f.follower.username}
            for f in follows
        ]

        return Response(data)