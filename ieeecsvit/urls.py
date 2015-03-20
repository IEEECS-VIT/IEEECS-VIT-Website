from django.conf.urls import patterns, include, url
from django.contrib import admin
import internal.views
urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'ieeecsvit.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),
                       url(r'^$', internal.views.my_view.as_view(), name='index',),
                       url(r'^admin/', include(admin.site.urls)),
                       )
