""" MODEL Tasks Work """

from django.db import models

class TaskWork( models.Model ):
    title        = models.CharField(max_length=80, blank=False)
    description = models.TextField()
    duration    = models.PositiveSmallIntegerField()

    # Control
    created     = models.DateTimeField(auto_now_add=True)
    modified    = models.DateTimeField(auto_now=True)

    # RelationShip
    task = models.ForeignKey('Task', on_delete=models.CASCADE)
