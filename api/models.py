from django.db import models

class RecipeResult(models.Model):
    items = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"ItemList {self.id}"
















# from django.contrib.auth.models import User
# from django.db import models

# class RecipeResult(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipe_results')
#     items = models.JSONField(blank=True, null=True)

#     def __str__(self):
#         return f"ItemList {self.id}"



    

# from django.db import models
# from django.contrib.auth.models import User

# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     favorite_list = models.JSONField(default=list)
#     input_list = models.JSONField(blank=True, null=True)
