from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import ast
from api.models import RecipeResult


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    
@api_view(['GET','POST'])
def show(request):
    if request.method == 'POST':
        items = request.data
        item_list = RecipeResult(items=items)
        item_list.save()
        return Response(items)
    
    elif request.method == 'GET':
        latest_item_list = RecipeResult.objects.last()
        if not latest_item_list:
            return Response({'error': 'No items found'})
        inlist = latest_item_list.items
        inglist = list(inlist)
        df = pd.read_csv('./dataset/recipedataset.csv')
        filter = []
        dicts = []
        for index,value in enumerate(df['IngredientList']):
            lists = ast.literal_eval(value)
            found_bool = []
            for num, item in enumerate(lists):
                found = any(item == recipe_item or f" {recipe_item} " in f" {item} " for recipe_item in inglist)
                found_bool.append(found)
                if num == len(lists) - 1:
                    break
                        
            if len(lists) == found_bool.count(True):
                filter.append(index)

        for index in filter:
            row = df.iloc[index]
            js = row.to_json()
            t=json.loads(js)
            dicts.append(t)

        all_list = tuple(dicts)
        return Response(all_list)
    return Response({"error": "Invalid request method"}, status=400)


# views.py

# from rest_framework.response import Response
# from rest_framework.decorators import action

# class UserProfileViewSet(viewsets.ModelViewSet):
#     queryset = UserProfile.objects.all()
#     serializer_class = UserProfileSerializer

#     def get_queryset(self):
#         user = self.request.user
#         return UserProfile.objects.filter(user=user)

#     @action(detail=True, methods=['post'])
#     def update_favorites(self, request, pk=None):
#         user_profile = self.get_object()
#         new_favorites = request.data.get('favorite_list')
#         user_profile.favorite_list = new_favorites
#         user_profile.save()
#         return Response({'status': 'Favorites updated successfully'})

#     @action(detail=True, methods=['post'])
#     def update_inputs(self, request, pk=None):
#         user_profile = self.get_object()
#         new_inputs = request.data.get('input_list')
#         user_profile.input_list = new_inputs
#         user_profile.save()
#         return Response({'status': 'Inputs updated successfully'})
