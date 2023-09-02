from django.urls import path
from .views import CargoListCreateView, CargoRetrieveUpdateDeleteView

urlpatterns = [
    path('', CargoListCreateView.as_view(), name='cargo-list'),
    path('<int:pk>/', CargoRetrieveUpdateDeleteView.as_view(), name='cargo-detail'),
]