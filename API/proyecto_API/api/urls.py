from django.urls import path
from .views import UsersView

urlpatterns = [
    path('users/', UsersView.as_view(), name='users_list'),
    path('users/<email>', UsersView.as_view(), name='user_search')
]