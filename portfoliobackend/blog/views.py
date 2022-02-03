from django.template.defaultfilters import slugify
from rest_framework import viewsets
from blog.models import Post, Category, Tag
from blog.serializers import PostSerializer, CategorySerializer, TagSerializer
from user_profile.permissions import IsOwnerOrReadOnly, ReadOnly
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.


class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminUser | ReadOnly]
    lookup_field = 'slug'


    def get_queryset(self):
        if self.request.user.is_staff:
            return Post.objects.all()
        else:
            return Post.objects.filter(published=True)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)


class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_class = [IsAdminUser|ReadOnly]

class TagViewset(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_class = [IsAdminUser|ReadOnly]


class AddCategoryToPostAPIView(APIView):
    def post(self, request, format=None):
        try:
            post_id = request.data['post_id']
            category_id = request.data['category_id']
            post = Post.objects.get(id=post_id)
            category = Category.objects.get(id=category_id)
            post.categories.add(category)
            return Response(status=200)
        except Exception as e:
            return Response(status=400, data=str(e))

class RemoveCategoryFromPostAPIView(APIView):
    def post(self, request, format=None):
        try:
            post_id = request.data['post_id']
            category_id = request.data['category_id']
            post = Post.objects.get(id=post_id)
            category = Category.objects.get(id=category_id)
            post.categories.remove(category)
            return Response(status=200)
        except Exception as e:
            return Response(status=400, data=str(e))

class AddTagToPostAPIView(APIView):
    def post(self, request, format=None):
        try:
            post_id = request.data['post_id']
            tag_id = request.data['tag_id']
            post = Post.objects.get(id=post_id)
            tag = Tag.objects.get(id=tag_id)
            post.tags.add(tag)
            return Response(status=200)
        except Exception as e:
            return Response(status=400, data=str(e))

class RemoveTagFromPostAPIView(APIView):
    def post(self, request, format=None):
        try:
            post_id = request.data['post_id']
            tag_id = request.data['tag_id']
            post = Post.objects.get(id=post_id)
            tag = Tag.objects.get(id=tag_id)
            post.tags.remove(tag)
            return Response(status=200)
        except Exception as e:
            return Response(status=400, data=str(e))