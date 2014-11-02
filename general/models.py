from django.db import models


class Members(models.Model):
    RegisterNumber = models.CharField(max_length=9, primary_key=True)
    Name = models.CharField(max_length=40, null=False)
    Email = models.EmailField(max_length=75, null=False)
    Phone = models.CharField(max_length=10, null=False)
    Hostel = models.CharField(max_length=5)
    Position = models.CharField(max_length=20, null=False, default='Core Member')


class Events(models.Model):
    Name = models.CharField(max_length=20, null=False)
    From = models.DateTimeField(null=False)
    To = models.DateTimeField(null=False)
    Description = models.TextField(null=False)
    venue = models.CharField(max_length=10, null=False)
