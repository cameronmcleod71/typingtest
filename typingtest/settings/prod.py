from .base import *
import os

SECRET_KEY = os.environ.get("TYPER_DJSETTINGS_KEY")
DEBUG = False
ALLOWED_HOSTS = ['localhost','137.184.142.120',"127.0.0.1"]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")