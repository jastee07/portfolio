# Generated by Django 3.2.7 on 2022-01-25 20:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_category_comment_tag'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='category',
        ),
    ]