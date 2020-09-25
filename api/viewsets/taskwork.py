""" Task Work ViewSet """
# Django REST framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

# Serializers
from api.serializers import TaskWorkModelSerializers

# Model
from api.models import TaskWork, Task

class TaskWorkViewSet( viewsets.ModelViewSet ):

    queryset = TaskWork.objects.all()
    serializer_class = TaskWorkModelSerializers

    def list(self, request, *args, **kwargs):

        query = TaskWork.objects.filter(task=request.GET.get('taskID'))
        pages = self.paginate_queryset(query)
        serializer = self.get_serializer(pages, many=True)

        return self.get_paginated_response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Actualiza las horas 
        task = Task.objects.get(pk=serializer.data['task'])
        value = task.rest - serializer.data['duration']

        task.rest = value if value > 0 else 0
        
        task.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers) 