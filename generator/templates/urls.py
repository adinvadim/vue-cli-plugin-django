from django.conf.urls import url
from django.views.generic import TemplateView

urlpatterns = [
    <%_ if (options.history) { _%>
    url(r'^.*$', TemplateView.as_view(template_name='client/index.html'), name="client"),
    <%_ } else {_%>
    url(r'^/?$', TemplateView.as_view(template_name='client/index.html'), name="client"),
    <%_ } _%>
]
