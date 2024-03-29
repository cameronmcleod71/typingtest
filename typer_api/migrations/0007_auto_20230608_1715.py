# Generated by Django 3.2.16 on 2023-06-08 17:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('typer_api', '0006_rename_specialchartest_specialctest'),
    ]

    operations = [
        migrations.CreateModel(
            name='CompletedTypingTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language', models.CharField(blank=True, choices=[('python', 'Python'), ('javascript', 'JavaScript'), ('java', 'Java')], max_length=50)),
                ('test_type', models.CharField(choices=[('programmer', 'Programmer'), ('specialc', 'SpecialC')], max_length=50)),
                ('time_taken', models.JSONField()),
                ('test', models.JSONField(verbose_name=models.JSONField())),
                ('results', models.JSONField()),
                ('duration', models.IntegerField(default=0)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='completed_typing_test', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='specialctest',
            name='owner',
        ),
        migrations.DeleteModel(
            name='ProgrammerTypingTest',
        ),
        migrations.DeleteModel(
            name='SpecialCTest',
        ),
    ]
