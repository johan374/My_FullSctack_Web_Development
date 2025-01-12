# Importing the User model from Django's built-in auth system and the serializers module from DRF
from django.contrib.auth.models import User
from rest_framework import serializers

# Define a custom serializer class for the User model
# Inheriting from `serializers.ModelSerializer` to automatically generate a serializer for the User model
class UserSerializer(serializers.ModelSerializer):
    # Explicitly define confirm_password field since it's not in User model
    confirm_password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "confirm_password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True}
        }

    def validate(self, data):
        """
        Check that the passwords match
        """
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError({"confirm_password": "Passwords do not match"})
        return data

    def validate_username(self, value):
        """
        Check if username already exists
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value

    def validate_email(self, value):
        """
        Check if email already exists
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def create(self, validated_data):
        """
        Create and return a new user instance
        """
        # Remove confirm_password from the data as it's not needed for user creation
        validated_data.pop('confirm_password', None)
        
        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
            return user
        except Exception as e:
            raise serializers.ValidationError(str(e))


 