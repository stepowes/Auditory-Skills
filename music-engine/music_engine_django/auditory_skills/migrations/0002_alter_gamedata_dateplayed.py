# Generated by Django 4.2.5 on 2023-12-05 08:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("auditory_skills", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="gamedata",
            name="datePlayed",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
