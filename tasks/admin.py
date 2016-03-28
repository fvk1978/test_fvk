from django.contrib import admin
from .models import Task, Account


class TaskAdmin(admin.ModelAdmin):
     model = Task
     #filter_horizontal = ('team',) #If you don't specify this, you will get a multiple select widget.

admin.site.register(Account)
admin.site.register(Task, TaskAdmin)

