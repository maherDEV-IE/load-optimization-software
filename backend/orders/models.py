from django.db import models

# Create your models here.
class Order(models.Model):
    client = models.ForeignKey('clients.Client', on_delete=models.CASCADE)
    cargo = models.ForeignKey('cargo.Cargo', on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order for {self.client} - {self.cargo}"