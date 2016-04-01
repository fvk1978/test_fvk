from requests import request, HTTPError

from django.core.files.base import ContentFile
from .models import Task, Account


def save_profile_picture(strategy, user, response, details,
                         is_new=False,*args,**kwargs):

    print kwargs['backend'].name
    if is_new and kwargs['backend'].name == 'facebook':
        url = 'http://graph.facebook.com/{0}/picture'.format(response['id'])

        try:
            response = request('GET', url, params={'type': 'large'})
            response.raise_for_status()
        except HTTPError:
            pass
        else:
            profile = Account.objects.get_or_create(user=user)[0]
            profile.avatar.save('{0}_social.jpg'.format(user.username),
                                   ContentFile(response.content))
            profile.save()
