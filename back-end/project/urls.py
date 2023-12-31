from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns



urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentication/', include('authentication.urls')),
    path('administrator/', include('administrator.urls')),
    path('profile_user/', include('profile_user.urls')),
    path('callback/', include('callback.urls')),
    path('blog/', include('blog.urls')),
    path('comment/', include('comment.urls')),
    path('quiz_american/', include('quiz_american.urls')),
    path('quiz_sentence/', include('quiz_sentence.urls')),
    path('quiz_voice/', include('quiz_voice.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += staticfiles_urlpatterns()
