""" MODEL User """

from django.contrib.auth.models import AbstractUser
from django.db import models

class User( AbstractUser ):
    
    # Relationship
    organization = models.ForeignKey('Organization', on_delete=models.CASCADE, null=True)
