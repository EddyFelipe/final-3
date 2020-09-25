""" Model Organization """

from django.db import models

class Organization( models.Model ):
    name        = models.CharField(max_length=80, blank=False, null=False)
    is_active   = models.BooleanField(default=True)

    def __str__(self):
        return self.name  