from django.conf.urls import url, include
from rest_framework import routers

from .views import TaskViewSet, IndexView

from . import views

router = routers.SimpleRouter()
router.register(r'tasks', TaskViewSet)


urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    #url('^api/v1/create$', TaskViewSet.as_view(), name='create'),
    #url(r'^$', views.index, name='index'),
    url(r'^.*$', IndexView.as_view(), name='index'),    
]
