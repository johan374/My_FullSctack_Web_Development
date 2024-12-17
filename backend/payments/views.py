# Import necessary modules
import stripe  # Stripe API for payment processing
from django.conf import settings  # To get settings like STRIPE_SECRET_KEY
from rest_framework.decorators import api_view, permission_classes  # Decorators for API views
from rest_framework.permissions import IsAuthenticated  # Permission class to ensure user is logged in
from rest_framework.response import Response  # For returning API responses
from django.shortcuts import get_object_or_404  # Helper to get object or return 404
from .models import Payment  # Our Payment model
from .serializers import PaymentSerializer  # Our Payment serializer

# Configure Stripe with our secret key from settings
stripe.api_key = settings.STRIPE_SECRET_KEY

# Create Payment Intent View
@api_view(['POST'])  # Only allow POST requests to this endpoint
@permission_classes([IsAuthenticated])  # User must be logged in to access this
def create_payment_intent(request):
   try:
       # Get data from the request
       data = request.data
       
       # Create a payment intent with Stripe
       intent = stripe.PaymentIntent.create(
           # Convert dollars to cents (Stripe uses cents)
           # e.g., $10.00 becomes 1000 cents
           amount=int(float(data['amount']) * 100),
           currency='usd',
           # Additional data to store with the payment
           metadata={
               'user_id': request.user.id,
               'plan_type': data['planType']
           }
       )
       
       # Create a payment record in our database
       payment = Payment.objects.create(
           user=request.user,  # Who is making the payment
           amount=data['amount'],  # How much they're paying
           payment_intent_id=intent.id,  # Stripe's reference ID
           plan_type=data['planType']  # Which plan they chose
       )
       
       # Return the necessary data to complete payment on frontend
       return Response({
           'clientSecret': intent.client_secret,  # Used by Stripe.js to complete payment # From Stripe
           'payment_id': payment.id  # Our internal reference ID # From your database
       })
   except Exception as e:
       # If anything goes wrong, return the error
       return Response({'error': str(e)}, status=400)

# Confirm Payment View
@api_view(['POST'])  # Only allow POST requests
@permission_classes([IsAuthenticated])  # User must be logged in
def confirm_payment(request, payment_id):
   # Get the payment or return 404 if not found
   # Also ensures the payment belongs to the logged-in user
   payment = get_object_or_404(Payment, id=payment_id, user=request.user)
   
   # Update payment status to completed
   payment.status = 'completed'
   payment.save()
   
   # Return success response
   return Response({'status': 'success'})

@api_view(['GET'])
def get_stripe_config(request):
    return Response({
        'publicKey': settings.STRIPE_PUBLISHABLE_KEY
    })

# Example usage in frontend:
"""
// Creating payment intent
const response = await axios.post('/api/payments/create-payment-intent/', {
   amount: 149.99,
   planType: 'single'
});

// Get clientSecret from response
const { clientSecret, payment_id } = response.data;

// Use clientSecret with Stripe.js to complete payment

// After payment is successful
await axios.post(`/api/payments/confirm-payment/${payment_id}/`);
"""