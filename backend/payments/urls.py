# Import necessary modules
from django.urls import path  # Used for defining URL patterns
from . import views          # Import views from the current directory

# Define a namespace for this app's URLs
# This helps avoid URL name conflicts between different apps
app_name = 'payments'

# Define list of URL patterns for the payments app
urlpatterns = [
    path('config/', views.get_stripe_config, name='get-stripe-config'),
    # URL pattern for creating a payment intent
    path(
        'create-payment-intent/',           # URL path
        views.create_payment_intent,        # View function to handle this URL
        name='create-payment-intent'        # Name to reference this URL pattern
    ),
    
    # URL pattern for confirming a payment
    path(
        'confirm-payment/<int:payment_id>/', # URL path with parameter
        views.confirm_payment,               # View function to handle this URL
        name='confirm-payment'               # Name to reference this URL pattern
    ),
]