from django.conf.urls import include, url
from django.contrib import admin
from social_django import urls


urlpatterns = [
    # Examples:
    # url(r'^$', 'test_fvk.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url('', include('social_django.urls', namespace='social')),
    url(r'^tasks/', include('tasks.urls')),
    url(r'^admin/', include(admin.site.urls)),
]
