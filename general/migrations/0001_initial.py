# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('Name', models.CharField(max_length=20)),
                ('From', models.DateTimeField()),
                ('To', models.DateTimeField()),
                ('Description', models.TextField()),
                ('venue', models.CharField(max_length=10)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('RegisterNumber', models.CharField(serialize=False, max_length=9, primary_key=True)),
                ('Name', models.CharField(max_length=40)),
                ('Email', models.EmailField(max_length=75)),
                ('Phone', models.CharField(max_length=10)),
                ('Hostel', models.CharField(max_length=5, null=True)),
                ('Position', models.CharField(max_length=20, default='Core Member')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
