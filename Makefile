# Simple Makefile for Django project routines

project=.
processes=4
user=www-data # owner of the socket, normally should be nginx user
instance=production # application instance

clean:
	-rm -rf build
	-rm -rf *~*
	-find . -name '*.pyc' -exec rm {} \;

test:
	python $(project)/manage.py test

fresh_syncdb:
	-rm -f $(project).sqlite
	python $(project)/manage.py syncdb --noinput

syncdb:
	python $(project)/manage.py syncdb --noinput

shell:
	python $(project)/manage.py shell

run:
	python $(project)/manage.py runserver 0.0.0.0:8000
