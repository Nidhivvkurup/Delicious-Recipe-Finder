from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
























# from django.contrib.auth.models import User
# from rest_framework import serializers
# from .models import RecipeResult

# class RecipeResultSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RecipeResult
#         fields = ['id', 'items']

# class UserSerializer(serializers.ModelSerializer):
#     recipe_results = RecipeResultSerializer(many=True, read_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'password', 'recipe_results']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         recipe_results_data = validated_data.pop('recipe_results', None)
#         user = User.objects.create_user(**validated_data)
#         if recipe_results_data:
#             for recipe_result_data in recipe_results_data:
#                 RecipeResult.objects.create(user=user, **recipe_result_data)
#         return user





# from rest_framework import serializers
# from .models import UserProfile

# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = ['id', "username", "password", 'favorite_list', 'input_list']
