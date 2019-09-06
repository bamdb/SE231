from django.urls import path, re_path

from . import view

urlpatterns = [
    re_path(r'^recommend$', view.api)
]
