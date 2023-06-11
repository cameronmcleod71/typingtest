from .base import *
import os

SECRET_KEY = os.environ.get("TYPER_DJSETTINGS_KEY")
DEBUG = False
ALLOWED_HOSTS = ['localhost','137.184.142.120',"devtyper.io", "www.devtyper.io"]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")