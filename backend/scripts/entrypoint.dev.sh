#!/bin/sh

# init database database
python /app/manage.py makemigrations
python /app/manage.py migrate
python /app/manage.py loaddata /app/init.json

# run dev server and selery workers
python /app/manage.py runserver 0.0.0.0:8000
