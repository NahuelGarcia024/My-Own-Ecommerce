from django.db import models
from Users.models import User

class Product(models.Model):
    slug = models.SlugField(max_length=100, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to="products")
    category = models.CharField(max_length=100, blank=True)
    rating = models.DecimalField(max_digits=10,decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(default=0)
    count_in_stock = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    

    
    
    
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    rating = models.DecimalField(max_digits=10,decimal_places=2, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

