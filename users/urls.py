from django.urls import path
from .views import ProfileViewSet, ReviewViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)
router.register(r'reviews', ReviewViewSet)
urlpatterns = router.urls