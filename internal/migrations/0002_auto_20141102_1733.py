# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [
        ('general', '0002_auto_20141102_1733'),
        ('internal', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Duty',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('Description', models.TextField()),
                ('Deadline', models.DateTimeField()),
                ('Type', models.CharField(max_length=10)),
                ('RegisterNumber', models.ForeignKey(to='general.Member')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='duties',
            name='RegisterNumber',
        ),
        migrations.DeleteModel(
            name='Duties',
        ),
    ]
