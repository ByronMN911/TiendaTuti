from rest_framework import viewsets, permissions, filters
from .models import Categoria, Producto, Pedido, Tienda
from .serializers import CategoriaSerializer, ProductoSerializer, PedidoSerializer, TiendaSerializer

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]

class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoSerializer
    permission_classes = [permissions.AllowAny]
    
    # -- Configuración del Buscador ---
    filter_backends = [filters.SearchFilter]
    # Le decimos a Django que busque coincidencias tanto en el nombre como en la descripción
    search_fields = ['nombre', 'descripcion'] 

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [permissions.AllowAny] # Permite Guest Checkout
    http_method_names = ['post'] # Solo permitimos crear pedidos (POST), no listarlos públicamente por seguridad

# --- Endpoint de Tiendas ---
class TiendaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer
    permission_classes = [permissions.AllowAny]