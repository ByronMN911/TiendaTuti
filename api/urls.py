from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriaViewSet, ProductoViewSet, CarritoViewSet, ItemCarritoViewSet

# El router crea automáticamente las URLs para listar y ver detalles
router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'carrito', CarritoViewSet, basename='carrito') # Nueva ruta
router.register(r'items-carrito', ItemCarritoViewSet, basename='items-carrito') # Nueva ruta

urlpatterns = [
    path('', include(router.urls)),
]