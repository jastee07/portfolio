from django.template.defaultfilters import slugify
from rest_framework import viewsets
from blog.models import Post, Category, Tag
from blog.serializers import PostSerializer, CategorySerializer, TagSerializer
from user_profile.permissions import IsOwnerOrReadOnly, ReadOnly
from rest_framework.permissions import IsAdminUser
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

