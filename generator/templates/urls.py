from django.conf.urls import url
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^<%= options.history ? ".*" : "/?" %>$', TemplateView.as_view(template_name='client/index.html'), name="client"),
]
