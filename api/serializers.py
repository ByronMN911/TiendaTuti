from rest_framework import serializers
from .models import Categoria, Producto, Pedido, DetallePedido, Tienda

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)

    class Meta:
        model = Producto
        fields = '__all__'

class DetallePedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallePedido
        fields = ['producto', 'cantidad', 'precio_unitario']

class PedidoSerializer(serializers.ModelSerializer):
    detalles = DetallePedidoSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'email', 'nombre', 'apellidos', 'cedula', 'telefono', 
                  'metodo_envio', 'direccion_envio', 'total', 'detalles', 'fecha_pedido', 'pagado']
        read_only_fields = ['pagado', 'fecha_pedido'] # El frontend no decide si ya se pagó

    def create(self, validated_data):
        # Separamos los detalles del pedido principal
        detalles_data = validated_data.pop('detalles')
        
        # Creamos el registro del pedido principal
        pedido = Pedido.objects.create(**validated_data)
        
        # Creamos los registros de cada producto comprado
        for detalle_data in detalles_data:
            DetallePedido.objects.create(pedido=pedido, **detalle_data)
            
            # Opcional pero recomendado: Restar el stock del producto
            producto = detalle_data['producto']
            if producto.stock >= detalle_data['cantidad']:
                producto.stock -= detalle_data['cantidad']
                producto.save()
                
        return pedido

# --- Serializador de Tiendas ---
class TiendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tienda
        fields = '__all__'