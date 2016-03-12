import datetime

from django.db import models
from django.utils import timezone

# Create your models here.


class Task(models.Model):
    title = models.CharField(max_length=200)
    summary = models.TextField()
    end_date = models.DateTimeField('deadline date')
    
    REQUIRED_FIELDS = ['title', 'summary', 'end_date']
    
    def is_active(self):
        return self.end_date >= timezone.now()
