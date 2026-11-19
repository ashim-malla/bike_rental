from rest_framework import serializers
from .models import Bike


class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ["name", "brand", "category", "engine", "rate", "image", "availability"]