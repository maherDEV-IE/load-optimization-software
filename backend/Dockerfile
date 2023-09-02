FROM python:3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN adduser --disabled-password --gecos "" app

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

RUN chown -R app:app /app/ &&\
    chmod +x /app/scripts/*

EXPOSE 8000

USER app

# Define the command to run the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]