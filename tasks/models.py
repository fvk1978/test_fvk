import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save


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
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = ['title', 'summary', 'end_date']
    
    def get_team(self):
        return self.team.all()

    def is_active(self):
        return self.end_date >= timezone.now()


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='tasks/static/images/avatars/', null=True, blank=True)
    task = models.ManyToManyField(Task, related_name='team', blank=True)
 
    def __unicode__(self):
        return self.user.username


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)