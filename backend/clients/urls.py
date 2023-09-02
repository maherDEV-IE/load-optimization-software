from django.urls import path
from .views import ClientListCreateView, ClientRetrieveUpdateDeleteView

urlpatterns = [
    path('',  ClientListCreateView.as_view(), name='client-list'),
    path('<int:pk>/', ClientRetrieveUpdateDeleteView.as_view(), name='client-detail'),
]