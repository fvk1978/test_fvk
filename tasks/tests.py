import datetime

from django.utils import timezone
from django.test import TestCase

from .models import Task


class TaskMethodTests(TestCase):

    def test_task_craeted_with_deadline_in_the_past(self):
        """
        test_task_craeted_with_deadline_in_the_past() should return False for tasks whose
        end_date is in the past.
        """
        time = timezone.now() - datetime.timedelta(days=30)
        past_task = Task(end_date=time)
        self.assertEqual(past_task.is_active(), False)
        