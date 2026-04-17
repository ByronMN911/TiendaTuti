from rest_framework import viewsets, permissions
from .models import Categoria, Producto, Pedido
from .serializers import CategoriaSerializer, ProductoSerializer, PedidoSerializer

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]

class ProductoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoSerializer
    permission_classes = [permissions.AllowAny]

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [permissions.AllowAny] # Permite Guest Checkout
    http_method_names = ['post'] # Solo permitimos crear pedidos (POST), no listarlos públicamente por seguridad