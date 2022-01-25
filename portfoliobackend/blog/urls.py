from rest_framework import routers
from blog.views import PostViewset,TagViewset, CategoryViewset


router = routers.SimpleRouter()

router.register(r'posts', PostViewset)
router.register(r'tags', TagViewset)
router.register(r'categories', CategoryViewset)

urlpatterns = router.urls