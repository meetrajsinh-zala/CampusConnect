# Generated by Django 5.1.1 on 2024-09-15 14:35

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_notice_and_events_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='notice_and_events',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='notice_and_events',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
