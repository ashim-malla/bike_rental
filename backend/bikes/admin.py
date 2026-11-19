from django.contrib import admin
from .models import Bike


@admin.register(Bike)
class BikeAdmin(admin.ModelAdmin):
    list_display = ("id", "brand", "name", "category", "rate", "availability")
    list_filter = ("category", "availability", "brand")
    list_editable = ("rate", "availability")