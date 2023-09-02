from rest_framework import generics
from .models import Cargo
from .serializers import CargoSerializer

# Create your views here.
class CargoListCreateView(generics.ListCreateAPIView):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer

class CargoRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer