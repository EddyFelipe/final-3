""" MODEL Tasks """

from django.db import models

class Task( models.Model ):
    name        = models.CharField(max_length=80, blank=False)
    description = models.TextField()
    duration    = models.PositiveSmallIntegerField()
    rest        = models.PositiveSmallIntegerField(default=0)
    finished    = models.BooleanField(default=False)

    # Control
    created     = models.DateTimeField(auto_now_add=True)
    modified    = models.DateTimeField(auto_now=True)

    # RelationShip
    organization = models.ForeignKey('Organization', on_delete=models.CASCADE)