from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Comic

# Create your views here.

def comic_detail(request, slug):
    comic = get_object_or_404(Comic, slug=slug)
    return render(request, 'comics/comics-detail.html',{'comic':comic})

# our-stack
def comics_list(request):
    comics = Comic.objects.all().order_by('-release_date')
    return render(request, 'comics/comics-list.html', {'comics':comics})

def comics_home(request):
    return render(request, 'comics/comics-home.html')