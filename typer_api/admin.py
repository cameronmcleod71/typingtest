from django.contrib import admin

# Register your models here.

from .models import ProgrammerTestScript, CompletedTypingTest

@admin.register(ProgrammerTestScript)
class ProgrammerTestScriptAdmin(admin.ModelAdmin):
    pass

@admin.register(CompletedTypingTest)
class CompletedTypingTestAdmin(admin.ModelAdmin):
    pass