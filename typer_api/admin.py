from django.contrib import admin

# Register your models here.

from .models import ProgrammerTestScript

@admin.register(ProgrammerTestScript)
class ProgrammerTestScriptAdmin(admin.ModelAdmin):
    pass