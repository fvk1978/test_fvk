import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Task(models.Model):
    title = models.CharField(max_length=200)
    summary = models.TextField()
    end_date = models.DateTimeField('deadline date')
    
    REQUIRED_FIELDS = ['title', 'summary', 'end_date']
    
    def get_team(self):
        return self.team.all()

    def is_active(self):
        return self.end_date >= timezone.now()

class Account(models.Model):
    username = models.CharField(max_length=200)
    task = models.ManyToManyField(Task, related_name='team', null=True, blank=True)
 
    def __unicode__(self):
        return self.username

