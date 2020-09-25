""" SERIALIZER Task Work """

# Django REST framework
from rest_framework import serializers

# Model
from api.models import TaskWork

class TaskWorkModelSerializers( serializers.ModelSerializer ):

    class Meta:
        model = TaskWork
        exclude = ['created','modified']