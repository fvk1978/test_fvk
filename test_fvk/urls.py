from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'test_fvk.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^tasks/', include('tasks.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('social_auth.urls')),
)
