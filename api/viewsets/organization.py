""" Organization ViewSet """

# Django REST Framework
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated

# Model
from api.models import Organization

# Serializers
from api.serializers import OrganizationModelSerializer, OrganizationReadSerializer

class OrganizationViewSet( viewsets.ModelViewSet ):

    queryset = Organization.objects.filter(is_active=True)
    serializer_class = OrganizationModelSerializer

    def get_permissions(self):

        if self.action in ['list','create']:
            permission_class = [AllowAny]
        else:
            permission_class = [IsAuthenticated]
        
        return [ permission() for permission in permission_class ]