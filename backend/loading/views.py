from rest_framework import generics
from truck.models import Truck  # Import your Truck model
from cargo.models import Cargo  # Import your Cargo model
from .utils import optimize_loading
from rest_framework.response import Response
from django.core.cache import cache
import hashlib
import pickle

# Create your views here.
class LoadingOptimizationView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        trucks = Truck.objects.all()
        cargos = Cargo.objects.all()

        # Calculate a hash of trucks and cargos to create a cache key
        trucks_serialized = pickle.dumps(trucks)
        cargos_serialized = pickle.dumps(cargos)

        trucks_hash = hashlib.md5(trucks_serialized).hexdigest()
        cargos_hash = hashlib.md5(cargos_serialized).hexdigest()
        cache_key = f"{trucks_hash}_{cargos_hash}"

        # Try to get the result from the cache
        optimized_loading = cache.get(cache_key)
        if optimized_loading is None:
            optimized_loading = optimize_loading(cargos, trucks)
            cache.set(cache_key, optimized_loading, 3600)
        return Response(optimized_loading)