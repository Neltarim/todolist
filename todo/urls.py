from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^update_session/', views.update_session, name='update'),
    url(r'^reset_session/', views.reset_session, name='reset'),
]