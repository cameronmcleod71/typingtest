FROM python:3-alpine

COPY /requirements.txt /requirements.txt

RUN pip3 install -r requirements.txt

COPY /typingtest /app

WORKDIR /app/typingtest

EXPOSE 8080

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8080"]