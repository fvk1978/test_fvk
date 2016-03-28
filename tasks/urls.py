from django.conf.urls import url, include
from rest_framework_nested import routers

from .views import TaskViewSet, IndexView, AccountViewSet, TaskAccountsViewSet

from . import views

router = routers.SimpleRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'accounts', AccountViewSet)
tasks_router = routers.NestedSimpleRouter(
    router, r'tasks', lookup='task'
)
tasks_router.register(r'team', TaskAccountsViewSet)

    #url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    #url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

urlpatterns = [
    url(r'^docs/', include('rest_framework_swagger.urls')),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(tasks_router.urls)),
    #url('^api/v1/create$', TaskViewSet.as_view(), name='create'),
    #url(r'^$', views.index, name='index'),
    url(r'^.*$', IndexView.as_view(), name='index'),    
]
