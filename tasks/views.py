from django.shortcuts import render
from .models import Task

def index(request):
    latest_task_list = Task.objects.order_by('-end_date')[:5]
    context = {'latest_task_list': latest_task_list}
    return render(request, 'index.html', context)