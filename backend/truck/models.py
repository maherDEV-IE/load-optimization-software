from django.db import models

# Create your models here.
class Truck(models.Model):
    TRUCK_TYPES = [
        ('1_ton_side_grill', '1 Ton Side grill'),
        ('1_ton_box', '1 Ton Box'),
        ('3_ton_side_grill', '3 Ton Side grill'),
        ('3_ton_box', '3 Ton Box'),
        ('7_ton_side_grill', '7 Ton Side grill'),
        ('7_ton_box', '7 Ton Box'),
        ('10_ton_side_grill', '10 Ton Side grill'),
        ('10_ton_box', '10 Ton Box'),
        ('12m_flatbed_box', '12m Flatbed Box'),
        ('12m_flatbed_open', '12m Flatbed Open'),
        ('12m_flatbed_side_grill', '12m Flatbed Side grill'),
        ('13.60m_flatbed_side_grill', '13.60m Flatbed Side grill'),
        ('13.60m_side_curtain', '13.60m Side curtain'),
        ('13.60m_box', '13.60m Box'),
        ('15.60m_side_curtain', '15.60m Side curtain'),
        ('15.60m_box', '15.60m Box'),
        ('15.60m_side_grill', '15.60m Side grill'),
        ('14m_low_bed', '14m Low Bed'),
        ('12m_double_axle_heavy_duty', '12m Double Axle Heavy Duty 28 Tons'),
    ]

    truck_type = models.CharField(max_length=30, choices=TRUCK_TYPES)
    max_weight = models.DecimalField(max_digits=7, decimal_places=0)
    length = models.DecimalField(max_digits=5, decimal_places=2)
    width = models.DecimalField(max_digits=4, decimal_places=2)
    height = models.DecimalField(max_digits=4, decimal_places=2)
    
    def __str__(self):
        return f"{self.get_truck_type_display()}"