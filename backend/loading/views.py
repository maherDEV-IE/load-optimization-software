from rest_framework import generics
from truck.models import Truck  # Import your Truck model
from cargo.models import Cargo  # Import your Cargo model
from .utils import optimize_loading
from rest_framework.response import Response

# Create your views here.
class LoadingOptimizationView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        trucks = Truck.objects.all()
        cargos = Cargo.objects.all()
        optimized_loading = optimize_loading(cargos, trucks)
        return Response(optimized_loading)