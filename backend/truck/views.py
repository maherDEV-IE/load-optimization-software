from rest_framework import generics
from .models import Truck
from .serializers import TruckSerializer

# Create your views here.
class TruckListCreateView(generics.ListCreateAPIView):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer

class TruckRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer