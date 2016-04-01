from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from .models import Task, Account

class AccountSerializer(serializers.ModelSerializer):
    
    avatar = serializers.SerializerMethodField()

    def get_avatar(self, instance):
        # returning avatar url if there is an avatar else blank string
        return instance.avatar.url if instance.avatar else ''
    
    class Meta:
        model = Account
        fields = ('id', 'user', 'avatar')

        def update(self, instance, validated_data):
            
            instance.save()

            return instance                
        
        
class TaskSerializer(serializers.ModelSerializer):
    
    team = AccountSerializer(many=True, read_only=False, required=False)

    class Meta:
        model = Task
        fields = ('id', 'title', 'summary', 'status', 'index', 'end_date', 'created', 'modified', 'team')

        def create(self, validated_data):
            return Task.objects.create(**validated_data)

        def update(self, instance, validated_data):
            
            instance.save()

            return instance


