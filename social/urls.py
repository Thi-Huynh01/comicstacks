from django.urls import path
from .views import FollowToggleView, FollowingListView, FollowersListView

urlpatterns = [
    path("follow/<int:user_id>/", FollowToggleView.as_view()),
    path("users/<int:user_id>/following/", FollowingListView.as_view()),
    path("users/<int:user_id>followers/", FollowersListView.as_view()),
]