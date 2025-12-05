from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from .views import ThreadCategoryViewSet, ThreadViewSet, ThreadReplyViewSet

router = DefaultRouter()
router.register(r'categories', ThreadCategoryViewSet, basename="thread-category")
router.register(r'threads', ThreadViewSet)

# Thread category router
category_router = routers.NestedDefaultRouter(router, r'categories', lookup="category")
category_router.register(r'threads', ThreadViewSet, basename="category-threads")

# Thread actual router
thread_router = routers.NestedDefaultRouter(category_router, r'threads', lookup="thread")
thread_router.register(r'replies', ThreadReplyViewSet, basename="thread-replies")

urlpatterns = router.urls + category_router.urls + thread_router.urls


'''
Endpoints:

/api/forums/categories/
/api/forums/categories/<category_slug>/threads/
/api/forums/categories/<category_slug>/threads/<thread_pk>/
/api/forums/categories/<category_slug>/threads/<thread_pk>/replies/

'''