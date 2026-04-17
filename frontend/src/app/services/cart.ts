import { Injectable, signal, computed, inject } from '@angular/core';
import { Api } from './api';

// Definimos la estructura interna del carrito en Angular
export interface CartItem {
  producto: any;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private api = inject(Api); // Inyectamos tu servicio de API
  
  // Signal privado que guarda los items (producto + cantidad)
  private cartItems = signal<CartItem[]>([]);

  // Señal computada para el Navbar (Suma las cantidades, no solo los items únicos)
  totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.cantidad, 0));
  
  // Señal computada para el Total a pagar ($)
  totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0));

  // Método mejorado para agregar productos
  addToCart(product: any) {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.producto.id === product.id);
      if (existingItem) {
        // Si ya existe, le sumamos 1 a la cantidad
        return items.map(i => i.producto.id === product.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      // Si es nuevo, lo agregamos con cantidad 1
      return [...items, { producto: product, cantidad: 1 }];
    });
  }

  getItems() {
    return this.cartItems();
  }

  clearCart() {
    this.cartItems.set([]);
  }

  // EL PUENTE HACIA DJANGO: Formatea los datos para el Guest Checkout
  finalizarCompra(datosCliente: any) {
    // 1. Armamos la lista de detalles como la espera tu Django (DetallePedidoSerializer)
    const detallesFormateados = this.cartItems().map(item => ({
      producto: item.producto.id,
      cantidad: item.cantidad,
      precio_unitario: item.producto.precio
    }));

    // 2. Unimos los datos del formulario (nombre, email, etc) con el total y los detalles
    const payloadPedido = {
      ...datosCliente,
      total: this.totalPrice(),
      detalles: detallesFormateados
    };

    // 3. Lo enviamos al backend y limpiamos el carrito si tiene éxito
    return this.api.crearPedido(payloadPedido);
  }
}