from django.db import models

# Create your models here.
class Cargo(models.Model):
    length = models.DecimalField(max_digits=5, decimal_places=2)
    width = models.DecimalField(max_digits=5, decimal_places=2)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=7, decimal_places=2)

    def __str__(self):
        return f"Cargo ({self.length}x{self.width}x{self.height})"
