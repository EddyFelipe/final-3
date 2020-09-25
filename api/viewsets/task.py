""" Task ViewSet """
# Django REST framework
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend

# Serializers
from api.serializers import TaskModelSerializers

# Model
from api.models import Task, TaskWork

# Utils
from django.db.models import Sum

class TaskViewSet( viewsets.ModelViewSet ):

    queryset = Task.objects.all()
    serializer_class = TaskModelSerializers
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    ordering_fields = ['name']
    ordering = ['name']

    def list(self, request, *args, **kwargs):
        
        # import pdb; pdb.set_trace()
        query = Task.objects.filter(organization=request.user.organization)
        pages = self.paginate_queryset(query)
        serializer = self.get_serializer(pages, many=True)

        return self.get_paginated_response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Actualiza el estado de las horas restantes
        horas_trabajadas = TaskWork.objects.filter(task=instance).aggregate(total=Sum('duration'))

        if horas_trabajadas['total']:

            value = instance.duration - horas_trabajadas['total']
            instance.rest = value if value > 0 else 0
            instance.save()

        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='search/(?P<name>[-a-zA-Z0-9_ ]+)')
    def search(self, request, name):

        query = Task.objects.filter(
            organization=request.user.organization,
            name__contains=name)

        pages = self.paginate_queryset(query)
        serializer = self.get_serializer(pages, many=True)

        return self.get_paginated_response(serializer.data)