from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Comic
from .serializer import ComicSerializer
from rest_framework import viewsets

# Create your views here.

# individual comic pages
def comic_detail(request, slug):
    comic = get_object_or_404(Comic, slug=slug)
    return render(request, 'comics/comics-detail.html',{'comic':comic})

# our-stack
def comics_list(request):
    comics = Comic.objects.all().order_by('-release_date')
    return render(request, 'comics/comics-list.html', {'comics':comics})

# landing page for comics tab
def comics_home(request):
    return render(request, 'comics/comics-home.html')

class ComicViewSet(viewsets.ModelViewSet):
    queryset = Comic.objects.all()
    serializer_class = ComicSerializer
    lookup_field = 'slug'