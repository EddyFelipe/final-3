""" Task Work ViewSet """
# Django REST framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

# Serializers
from api.serializers import TaskWorkModelSerializers, TaskModelSerializers

# Model
from api.models import TaskWork, Task

# Utils
from django.db.models import Sum, Count

class ReportViewSet( viewsets.ReadOnlyModelViewSet ):

    queryset = Task.objects.all()
    serializer_class = TaskModelSerializers

    @action(detail=False, methods=['get'])
    def resumen(self, request):

        report = TaskWork.objects.filter(
            task__in=[ t.id for t in Task.objects.filter(organization=request.user.organization) ]
        ).aggregate(total_horas=Sum('duration'), total=Count('id')) 
        
        report['promedio'] = 0

        if report['total_horas']:
            report['promedio'] = round( ( report['total_horas'] / report['total']),2)
       
        return Response(report,status=status.HTTP_200_OK)