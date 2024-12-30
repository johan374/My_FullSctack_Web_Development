# Import necessary Django and Python libraries
from django.db import models  # Django's ORM (Object-Relational Mapping) for database models
from django.contrib.auth import get_user_model  # Utility to get the current User model
from django.utils import timezone  # Django's timezone utilities for handling dates and times
import random  # Python's random number generation module

# Get the current User model (allows for custom user models)
User = get_user_model()

class PasswordResetCode(models.Model):
    # Define model fields for storing password reset code information

    # Foreign key to link the reset code to a specific user
    # on_delete=models.CASCADE means if the user is deleted, all associated reset codes are also deleted
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # Stores the 6-digit reset code as a string
    # max_length=6 ensures the code is always 6 characters long
    code = models.CharField(max_length=6)
    
    # Automatically sets the creation timestamp when the record is first created
    # auto_now_add=True means this field is set only when the object is first created
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Stores the expiration time for the reset code
    # Will be used to determine if the code is still valid
    expires_at = models.DateTimeField()
    
    # Tracks whether the reset code has been used
    # Prevents reusing the same reset code multiple times
    used = models.BooleanField(default=False)

    @classmethod
    def generate_code():
        # Empty list to store random digits
        code_digits = []
        
        # Generate 6 random digits
        for _ in range(6):
            # Generate a random digit between 0-9
            random_digit = random.randint(0, 9)
            
            # Convert to string and add to list
            code_digits.append(str(random_digit))
        
        # Join the digits into a single string
        return ''.join(code_digits)

    @classmethod
    def create_for_user(cls, user):
        """
        Creates a new reset code for a specific user
        
        Workflow:
        1. Clean up any old, unused reset code attempts
        2. Generate a new 6-digit code
        3. Set an expiration time (15 minutes from now)
        4. Create and save a new PasswordResetCode instance
        
        Args:
            user (User): The user requesting a password reset
        
        Returns:
            PasswordResetCode: The newly created reset code instance
        """
        # Remove any old, unused reset code attempts for this user
        cls.cleanup_old_attempts(user)
        
        # Generate a new 6-digit reset code
        code = cls.generate_code()
        
        # Set expiration time to 15 minutes from the current time
        expires_at = timezone.now() + timezone.timedelta(minutes=15)
        
        # Create and return a new PasswordResetCode instance
        return cls.objects.create(
            user=user,
            code=code,
            expires_at=expires_at
        )

    @classmethod
    def cleanup_old_attempts(cls, user):
        """
        Removes old, unused reset code attempts
        
        This method helps manage database clutter by:
        - Identifying reset codes older than 30 minutes
        - Deleting unused codes for a specific user
        
        Args:
            user (User): The user whose old reset code attempts should be cleaned
        """
        # Calculate the timestamp 30 minutes ago
        thirty_mins_ago = timezone.now() - timezone.timedelta(minutes=30)
        
        # Delete reset codes that:
        # 1. Belong to the specific user
        # 2. Were created more than 30 minutes ago
        # 3. Have not been used
        cls.objects.filter(
            user=user,
            created_at__lt=thirty_mins_ago,  # less than 30 minutes old
            used=False
        ).delete()