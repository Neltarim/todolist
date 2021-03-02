from django.conf import settings
from django.contrib import admin
from django.contrib import auth
from django.urls import path, include
from django.conf.urls import url

import todo

urlpatterns = [
    url(r'^', include(('todo.urls', 'todo'), namespace="todo")),
]