""" SERIALIZER Organization """

# Django REST framework
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

# Model 
from api.models.organization import Organization

class OrganizationModelSerializer( serializers.ModelSerializer ):
    name = serializers.CharField(
        validators = [ UniqueValidator(queryset=Organization.objects.filter(is_active=True),
                        message='The name mist be unique')]
    )

    class Meta:
        model = Organization
        fields = '__all__'

class OrganizationReadSerializer( serializers.ModelSerializer ):

    name = serializers.SerializerMethodField('obj_name')
    class Meta:
        model = Organization
        fields = ['name']
    
    def obj_name(self, obj):
        return { 'value': obj.id, 'label': obj.name }