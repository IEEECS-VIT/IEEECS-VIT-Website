# Create your views here.
from django.shortcuts import render


def my_view(request):
    # View code here...
    return render(request, 'index.html', dirs=('templates',))