import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils import timezone
from .models import Task

class Account(models.Model):
    username = models.CharField(max_length=200)
    task = models.ManyToManyField(Task, related_name='team', null=True, blank=True)
 
    def __unicode__(self):
        return self.username

