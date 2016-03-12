from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = ('id', 'title', 'summary', 'end_date')

        def create(self, validated_data):
            return Task.objects.create(**validated_data)

        def update(self, instance, validated_data):
            
            instance.save()

            return instance        