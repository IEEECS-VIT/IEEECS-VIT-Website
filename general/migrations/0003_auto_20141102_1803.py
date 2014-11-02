# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [
        ('general', '0002_auto_20141102_1733'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='Hostel',
            field=models.CharField(max_length=5, null=True),
            preserve_default=True,
        ),
    ]
