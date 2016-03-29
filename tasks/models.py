import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Task(models.Model):
    STATUS = (('open', 'open'),
                      ('done', 'done'))
    title = models.CharField(max_length=200)
    summary = models.TextField()
    status = models.CharField(max_length=10,
                                              choices=STATUS,
                                              default='open')
    index = models.IntegerField(default=0)
    end_date = models.DateTimeField(help_text='Deadline date', blank=True, null=True)
    
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

