# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Events',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
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
            name='Members',
            fields=[
                ('RegisterNumber', models.CharField(max_length=9, serialize=False, primary_key=True)),
                ('Name', models.CharField(max_length=40)),
                ('Email', models.EmailField(max_length=75)),
                ('Phone', models.CharField(max_length=10)),
                ('Hostel', models.CharField(max_length=5)),
                ('Position', models.CharField(max_length=20, default='Core Member')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
