# Generated by Django 5.0.3 on 2024-04-29 18:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_items_reciperesult_recipe_results'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reciperesult',
            old_name='recipe_results',
            new_name='items',
        ),
    ]
