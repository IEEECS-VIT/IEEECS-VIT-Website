from django.db import models
from general.models import Member


class Duty(models.Model):
    RegisterNumber = models.ForeignKey(Member)
    Description = models.TextField(null=False)
    Deadline = models.DateTimeField(null=False)
    Type = models.CharField(max_length=10, null=False)

    def __str__(self):
        return self.Description + ' <' + self.RegisterNumber + '>'
