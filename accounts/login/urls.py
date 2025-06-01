urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/',include('accounts.urls')),
]