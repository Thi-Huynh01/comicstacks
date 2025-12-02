from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ThreadReplyViewSet, ThreadViewSet, ThreadCategoryViewSet

router = DefaultRouter()
router.register(r'thread-categories', ThreadCategoryViewSet)
router.register(r'threads', ThreadViewSet)
router.register(r'thread-replies', ThreadReplyViewSet)

urlpatterns = router.urls

'''
Endpoints:

/api/thread-categories/ -list all categories
/api/thread-categories/<slug>/ - get single category by slug
/api/threads/ -list all threads
/api/threads/<pk>/ get single thread via primary key
'''