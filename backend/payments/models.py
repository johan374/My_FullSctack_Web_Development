# Import necessary Django modules
from django.db import models
from django.contrib.auth.models import User

class Payment(models.Model):
    # Define possible status choices for a payment as a list of tuples
    # First value in each tuple is stored in database, second value is human-readable
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),    # Payment initiated but not completed
        ('completed', 'Completed'), # Payment successfully processed
        ('failed', 'Failed')       # Payment attempt failed
    ]
    
    # ForeignKey creates a many-to-one relationship with User model
    # one user can have many payments, but each payment belongs to only one user
    # on_delete=models.CASCADE means if a user is deleted, all their payments are also deleted
    # related_name='payments' allows accessing a user's payments via user.payments.all()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    
    # DecimalField stores exact decimal numbers, perfect for currency
    # max_digits=10 allows numbers up to 9999999.99
    # decimal_places=2 stores cents/pennies (e.g., $10.99)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Stores Stripe's payment intent ID for tracking the payment in Stripe's system
    payment_intent_id = models.CharField(max_length=255)
    
    # Status field using the choices defined above
    # default='pending' means new payments start in 'pending' status
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    
    # Automatically stores the date and time when payment record is created
    # auto_now_add=True means this is set only when the record is first created
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Stores which subscription plan was chosen ('single', 'partnership', or 'group')
    plan_type = models.CharField(max_length=20)

    # String representation of the Payment object
    # This defines how the payment appears in admin interface and when printed
    # Example output: "john_doe - 149.99 - pending"
    def __str__(self):
        return f"{self.user.username} - {self.amount} - {self.status}"