from rest_framework import routers
from blog.views import PostViewset,TagViewset, CategoryViewset, AddCategoryToPostAPIView, AddTagToPostAPIView, \
    RemoveCategoryFromPostAPIView, RemoveTagFromPostAPIView
from django.urls import path


router = routers.SimpleRouter()

router.register(r'posts', PostViewset)
router.register(r'tags', TagViewset)
router.register(r'categories', CategoryViewset)


urlpatterns = router.urls

urlpatterns += [
    path('add-category-to-post/', AddCategoryToPostAPIView.as_view(), name='add-category-to-post'),
    path('add-tag-to-post/', AddTagToPostAPIView.as_view(), name='add-tag-to-post'),
    path('remove-category-from-post/', RemoveCategoryFromPostAPIView.as_view(), name='remove-category-from-post'),
    path('remove-tag-from-post/', RemoveTagFromPostAPIView.as_view(), name='remove-tag-from-post'),
]