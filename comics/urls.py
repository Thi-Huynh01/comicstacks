from django.urls import path
from .views import ComicViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'comics', ComicViewSet)

urlpatterns = router.urls

#urlpatterns = [
    #path('', views.ComicListView.as_view(), name='comic_list'),
    #path('comic-detail/', views.comic_detail, name='detail'),
#    path('', views.comics_home, name='home'),
#    path('our-stack/', views.comics_list, name='comics_list'),
#    path('our-stack/<slug:slug>/', views.comic_detail, name='comic_detail'),
    # add top comics
#]