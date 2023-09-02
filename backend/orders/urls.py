from django.urls import path
from .views import OrderListCreateView, OrderRetrieveUpdateDeleteView

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='order-list'),
    path('<int:pk>/', OrderRetrieveUpdateDeleteView.as_view(), name='order-detail'),
]