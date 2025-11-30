from django.urls import path
from .views import ProfileViewSet, ReviewViewSet
from rest_framework.routers import DefaultRouter
from comics.views import ComicViewSet
from rest_framework_nested import routers

router = DefaultRouter()
router.register(r'comics', ComicViewSet, basename ='comic')
router.register(r'profiles', ProfileViewSet)

reviews_router = routers.NestedDefaultRouter(router, r'comics', lookup='slug')
reviews_router.register(r'reviews', ReviewViewSet, basename='comic-reviews')

#router.register(r'profiles', ProfileViewSet)
#router.register(r'reviews', ReviewViewSet)

urlpatterns = router.urls + reviews_router.urls