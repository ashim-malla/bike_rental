# bikes/models.py
from django.db import models

class Bike(models.Model):
    CATEGORIES = [
        ("scooter", "Scooter"),
        ("street", "Street"),
        ("adventure", "Adventure"),
    ]

    name = models.CharField(max_length=50)
    brand = models.CharField(max_length=50)
    engine = models.CharField(max_length=50)
    rate = models.PositiveIntegerField()
    category = models.CharField(choices=CATEGORIES)
    image = models.ImageField(upload_to='bikes/', blank=True, null=True)
    availability = models.BooleanField(default=True)
    registration_number = models.CharField(max_length=20, unique=True, null=True, blank=True)

def __str__(self):
    return f"{self.brand} {self.name}"