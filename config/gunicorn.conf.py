bind = "0.0.0.0:80"
workers = 3
accesslog = "/app/typingtest/logs/gunicorn.access.log"
errorlog = "/app/typingtest/logs/gunicorn.app.log"
capture_output = True
loglevel = "info"