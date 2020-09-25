""" SERIALIZER Task """

# Django REST framework
from rest_framework import serializers

# Model
from api.models import Task

class TaskModelSerializers( serializers.ModelSerializer ):

    class Meta:
        model = Task
        # fields = '__all__'
        exclude = ['created','modified']