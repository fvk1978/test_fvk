from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from .models import Task, Account

class AccountSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Account
        fields = ('id', 'username', 'task')

        def update(self, instance, validated_data):
            
            instance.save()

            return instance                
        
        
class TaskSerializer(serializers.ModelSerializer):
    
    team = AccountSerializer(many=True, read_only=False, required=False)

    class Meta:
        model = Task
        fields = ('id', 'title', 'summary', 'end_date', 'team')

        def create(self, validated_data):
            return Task.objects.create(**validated_data)

        def update(self, instance, validated_data):
            
            instance.save()

            return instance


