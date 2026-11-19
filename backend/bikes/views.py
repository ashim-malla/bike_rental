from rest_framework.generics import ListAPIView
from .models import Bike
from .serializers import BikeSerializer


class BikeList(ListAPIView):
    serializer_class = BikeSerializer

    def get_queryset(self):
        queryset = Bike.objects.all()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset