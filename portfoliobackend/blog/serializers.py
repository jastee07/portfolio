from rest_framework import serializers
from blog.models import Post, Category, Tag
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name'
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug'
        ]
        read_only_fields = ['slug']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = [
            'id', 'name', 'slug'
        ]
        read_only_fields = ['slug']


class PostSerializer(serializers.ModelSerializer):
    owner = AuthorSerializer(read_only=True)
    slug = serializers.SerializerMethodField(method_name='get_slug')
    tags = TagSerializer(read_only=True,many=True)
    categories = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = [
                'id', 'owner', 'title', 'body',
                'published', 'published_at', 'created_at',
                'updated_at', 'slug', 'tags',
                'categories'
            ]
        lookup_field = 'slug'

    def get_slug(self, obj):
        return slugify(obj.title)
