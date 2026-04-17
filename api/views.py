from rest_framework import viewsets, permissions
from .models import Categoria, Producto, Carrito, ItemCarrito
from .serializers import CategoriaSerializer, ProductoSerializer, CarritoSerializer, ItemCarritoSerializer

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    # Filtramos para que Angular solo vea los productos que están activos
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoSerializer
    
class CarritoViewSet(viewsets.ModelViewSet):
    serializer_class = CarritoSerializer
    permission_classes = [permissions.IsAuthenticated] # 🔒 Seguridad JWT

    def get_queryset(self):
        # El usuario solo ve SU propio carrito
        return Carrito.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        # Al crear un carrito, se asigna automáticamente al usuario logueado
        serializer.save(usuario=self.request.user)

class ItemCarritoViewSet(viewsets.ModelViewSet):
    serializer_class = ItemCarritoSerializer
    permission_classes = [permissions.IsAuthenticated] # 🔒 Seguridad JWT

    def get_queryset(self):
        # Solo vemos items que pertenecen al carrito del usuario logueado
        return ItemCarrito.objects.filter(carrito__usuario=self.request.user)