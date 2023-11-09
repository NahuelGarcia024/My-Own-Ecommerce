from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "id", "name", "last_name", "avatar"]
       

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password", "name", "last_name", ]
        extra_kwargs = {
            "password": {"write_only": True}
        }
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, User):
        token = super().get_token(User)
        
        token["email"] = User.email
        token["avatar"] = User.avatar.url
        token["is_staff"] = User.is_staff
        token["name"] = User.name
        token["last_name"] = User.last_name
        
        return token