from django.urls import path
from .views import LoadingOptimizationView

urlpatterns = [
    path('', LoadingOptimizationView.as_view(), name='optimize-loading'),
    path('<int:pk>/', LoadingOptimizationView.as_view(), name='optimize-loading'),
]