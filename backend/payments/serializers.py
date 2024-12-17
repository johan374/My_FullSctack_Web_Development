# Import necessary modules from Django REST framework and local models
from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    # ModelSerializer automatically creates a serializer based on our Payment model
    # It handles converting Payment objects to JSON and vice versa
    
    class Meta:
        # Tell the serializer which model to use
        model = Payment
        
        # List of fields that should be included in the serialized output
        fields = [
            'id',           # Payment's database ID
            'amount',       # Payment amount (e.g., 149.99)
            'status',       # Payment status (pending/completed/failed)
            'created_at',   # When the payment was created
            'plan_type'     # Which plan was chosen (single/partnership/group)
        ]
        
        # Fields that can only be read, not written to
        read_only_fields = [
            'payment_intent_id',  # Stripe's payment ID should not be modifiable by API
            'status'             # Payment status should only be modified by backend logic
        ]

# Example usage:
# 1. Serializing a payment (converting to JSON):
"""
payment = Payment.objects.get(id=1)
serializer = PaymentSerializer(payment)
json_data = serializer.data
# Result would look like:
{
    "id": 1,
    "amount": "149.99",
    "status": "pending",
    "created_at": "2024-12-15T14:30:45Z",
    "plan_type": "single"
}
"""

# 2. Deserializing (converting JSON to Payment object):
"""
data = {
    "amount": "149.99",
    "plan_type": "single"
}
serializer = PaymentSerializer(data=data)
if serializer.is_valid():
    payment = serializer.save()
"""