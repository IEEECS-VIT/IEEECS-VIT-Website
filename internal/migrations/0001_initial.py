# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):
    dependencies = [
        ('general', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Duties',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('Description', models.TextField()),
                ('Deadline', models.DateTimeField()),
                ('Type', models.CharField(max_length=10)),
                ('RegisterNumber', models.ForeignKey(to='general.Members')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
