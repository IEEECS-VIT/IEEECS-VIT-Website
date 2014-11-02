# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('general', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Duty',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('Description', models.TextField()),
                ('Deadline', models.DateTimeField()),
                ('Type', models.CharField(max_length=10)),
                ('RegisterNumber', models.ForeignKey(to='general.Member')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
