# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-13 17:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('dept', models.CharField(max_length=4)),
                ('course_num', models.IntegerField()),
                ('unique', models.IntegerField()),
                ('title', models.CharField(max_length=15)),
                ('instructor', models.CharField(max_length=20)),
                ('days', models.CharField(max_length=6)),
                ('start_time', models.IntegerField()),
                ('end_time', models.IntegerField()),
                ('building', models.CharField(max_length=5)),
                ('room', models.IntegerField()),
            ],
        ),
    ]
