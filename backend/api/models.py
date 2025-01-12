from django.db import models  # Import the Django models module to define model fields
from django.contrib.auth.models import User  # Import the User model to create a foreign key relationship
from django.conf import settings
# Create your models here.
    
# Add this to api/models.py along with your existing Note model
class RememberMeToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        db_table = 'remember_me_tokens'
