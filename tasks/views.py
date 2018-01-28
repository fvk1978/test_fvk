from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator
from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
import json
import urllib2

from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout as auth_logout, login

from social_core.backends.oauth import BaseOAuth1, BaseOAuth2
from social_core.backends.google import GooglePlusAuth
from social_core.backends.utils import load_backends
from social_django.utils import psa

from decorators import render_to

from .serializers import TaskSerializer, AccountSerializer
from .models import Task, Account


class AccountViewSet(viewsets.ModelViewSet):
    #lookup_field = 'title'
    queryset = Account.objects.all().order_by('-id')
    serializer_class = AccountSerializer
    
    def list(self, request,*kwargs):
        queryset = Account.objects.all()
        serializer = self.get_serializer(queryset,many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)

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
    
    def get_queryset(self):
        return Task.objects.filter(team__id=self.request.user.id).order_by('index')
    
    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = Account.objects.get(pk=request.user.id)
            Task.objects.create(**serializer.validated_data).team.add(user)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

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
        serializer.is_valid()
        user = Account.objects.get(pk=serializer.data['user'])
        if user:
            if user in task.team.all():
                task.team.remove(user)
                task.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

    
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
        serializer.is_valid()
        user = Account.objects.get(pk=serializer.data['user'])
        if user:
            if user not in task.team.all():
                task.team.add(user)
                task.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        


def context(**extra):
    return dict({
        'plus_id': getattr(settings, 'SOCIAL_AUTH_GOOGLE_PLUS_KEY', None),
        'plus_scope':load_backends(settings.AUTHENTICATION_BACKENDS),
        'available_backends': load_backends(settings.AUTHENTICATION_BACKENDS)
    }, **extra)


class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        c = super(IndexView, self).get_context_data(**kwargs)
        c.update(context())
        return c    
    
def logout(request):
    """Logs out user"""
    print "XXX"
    a = auth_logout(request)
    print a
    print "XXX"
    return redirect('/tasks/')


@render_to('index.html')
def home(request):
    """Home view, displays login mechanism"""
    if request.user.is_authenticated():
        return redirect('done')
    return context()


@login_required
@render_to('index.html')
def done(request):
    """Login complete view, displays user data"""
    return context()


@render_to('index.html')
def validation_sent(request):
    return context(
        validation_sent=True,
        email=request.session.get('email_validation_address')
    )


@render_to('index.html')
def require_email(request):
    backend = request.session['partial_pipeline']['backend']
    return context(email_required=True, backend=backend)


@psa('social:complete')
def ajax_auth(request, backend):
    if isinstance(request.backend, BaseOAuth1):
        token = {
            'oauth_token': request.REQUEST.get('access_token'),
            'oauth_token_secret': request.REQUEST.get('access_token_secret'),
        }
    elif isinstance(request.backend, BaseOAuth2):
        token = request.REQUEST.get('access_token')
    else:
        raise HttpResponseBadRequest('Wrong backend type')
    user = request.backend.do_auth(token, ajax=True)
    login(request, user)
    data = {'id': user.id, 'username': user.username}
    return HttpResponse(json.dumps(data), mimetype='application/json')
