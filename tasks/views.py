from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
import json

from .serializers import TaskSerializer, AccountSerializer
from .models import Task, Account


class AccountViewSet(viewsets.ModelViewSet):
    #lookup_field = 'title'
    queryset = Account.objects.all().order_by('-id')
    serializer_class = AccountSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    
class TaskViewSet(viewsets.ModelViewSet):
    #lookup_field = 'title'
    queryset = Task.objects.all().order_by('index')
    serializer_class = TaskSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Task.objects.create(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        print serializer.errors
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    @detail_route(methods=['post'])
    def remove_user(self, request, pk=None):
        """
        Remove user from task's team
        """
        serializer = AccountSerializer(data=request.data)
        task = Task.objects.get(pk=pk)
        if serializer.is_valid():
            user = Account.objects.get(username=serializer.data['username'])
            if user in task.team.all():
                task.team.remove(user)
                task.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print serializer.errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

    
class CreateTaskView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        

class TaskAccountsViewSet(viewsets.ViewSet):
    queryset = Account.objects.select_related('task').order_by('-id')
    serializer_class = AccountSerializer

    def list(self, request, task_pk=None):
        """
        Get task's list
        """
        queryset = self.queryset.filter(task=task_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)

    def retrieve(self, request, pk=None, task_pk=None):
        """
        Get taks's details
        """
        queryset = self.queryset.get(pk=pk, task=task_pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, task_pk=None, format=None):
        """
        Add user to the task's team
        """
        serializer = self.serializer_class(data=request.data)
        task = Task.objects.get(pk=task_pk)
        if serializer.is_valid():
            user = Account.objects.get(username=serializer.data['username'])
            if user not in task.team.all():
                task.team.add(user)
                task.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        


class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)
    
    
#def index(request):
    #latest_task_list = Task.objects.order_by('-end_date')[:5]
    #context = {'latest_task_list': latest_task_list}
    #return render(request, 'index.html', context)