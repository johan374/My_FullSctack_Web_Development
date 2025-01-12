from django.urls import path  # Import the `path` function to define URL patterns
from . import views  # Import the views module from the current application

# Define the URL patterns for this app
urlpatterns = [
    path("user/current/", views.current_user, name="current-user"),  # Add this new URL pattern
]
