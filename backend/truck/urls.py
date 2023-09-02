from django.urls import path
from .views import TruckListCreateView, TruckRetrieveUpdateDeleteView

urlpatterns = [
    path('', TruckListCreateView.as_view(), name='truck-list-create'),
    path('<int:pk>/', TruckRetrieveUpdateDeleteView.as_view(), name='truck-retrieve-update-delete'),
]