from django.db import models


class Member(models.Model):
    RegisterNumber = models.CharField(max_length=9, primary_key=True)
    Name = models.CharField(max_length=40, null=False)
    Email = models.EmailField(max_length=75, null=False)
    Phone = models.CharField(max_length=10, null=False)
    Hostel = models.CharField(max_length=5)
    Position = models.CharField(max_length=20, null=False, default='Core Member')

    def __str__(self):
        return self.Name + ' <' + self.RegisterNumber + '>'


class Event(models.Model):
    Name = models.CharField(max_length=20, null=False)
    From = models.DateTimeField(null=False)
    To = models.DateTimeField(null=False)
    Description = models.TextField(null=False)
    venue = models.CharField(max_length=10, null=False)

    def __str__(self):
        return self.Name + ' <' + self.Venue + '>'
