from django.conf.urls import url, include
from rest_framework_nested import routers
from rest_framework_swagger.views import get_swagger_view

from .views import TaskViewSet, IndexView, AccountViewSet, TaskAccountsViewSet, ajax_auth, home, logout, done

from . import views

router = routers.SimpleRouter()
router.register(r'tasks', TaskViewSet, 'Task')
router.register(r'accounts', AccountViewSet)
tasks_router = routers.NestedSimpleRouter(
    router, r'tasks', lookup='task'
)
tasks_router.register(r'team', TaskAccountsViewSet)

    #url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    #url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    url(r'^docs/', schema_view),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(tasks_router.urls)),
    #url('^api/v1/create$', TaskViewSet.as_view(), name='create'),
    #url(r'^$', views.index, name='index'),
    url(r'^login/$', home, name='home'),
    url(r'^logout/$', logout, name='logout'),
    url(r'^done/$', done, name='done'),
    url(r'^ajax-auth/(?P<backend>[^/]+)/$', ajax_auth,
        name='ajax-auth'),
    url(r'^.*$', IndexView.as_view(), name='index'),    
]
