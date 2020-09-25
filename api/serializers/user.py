from rest_framework import serializers
# from django.contrib.auth.models import User
from api.models.user import User
from api.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'profile',
            'password',
            'organization'
        )


class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)
    organization = serializers.SerializerMethodField('obj_organization')

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
            'organization'
        )
    
    def obj_organization(self, obj):
        if obj.organization:
            return { 'id': obj.organization.id, 'name': obj.organization.name }
        return {}
