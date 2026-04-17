import { Injectable, signal, computed } from '@angular/core';

// Interfaz del producto dentro del carrito
export interface CartItem {
  id:       number;
  nombre:   string;
  precio:   number;
  imagen:   string;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  // Signal privada: array de ítems en el carrito
  private _items = signal<CartItem[]>([]);

  // Signal pública de solo lectura
  readonly items = this._items.asReadonly();

  // Computed: total de unidades (para el badge del navbar)
  readonly totalItems = computed(() =>
    this._items().reduce((acc, item) => acc + item.cantidad, 0)
  );

  // Computed: precio total del carrito
  readonly totalPrecio = computed(() =>
    this._items().reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  );

  /** Añade un producto al carrito o incrementa su cantidad */
  agregarProducto(producto: Omit<CartItem, 'cantidad'>): void {
    const items = this._items();
    const existente = items.find(i => i.id === producto.id);

    if (existente) {
      // Ya existe: solo aumentar cantidad
      this._items.set(
        items.map(i =>
          i.id === producto.id
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        )
      );
    } else {
      // Nuevo producto: agregar con cantidad 1
      this._items.set([...items, { ...producto, cantidad: 1 }]);
    }
  }

  /** Cambia la cantidad de un producto (si llega a 0, lo elimina) */
  cambiarCantidad(id: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.eliminarProducto(id);
    } else {
      this._items.set(
        this._items().map(i =>
          i.id === id ? { ...i, cantidad } : i
        )
      );
    }
  }

  /** Elimina un producto del carrito */
  eliminarProducto(id: number): void {
    this._items.set(this._items().filter(i => i.id !== id));
  }

  /** Vacía completamente el carrito */
  vaciarCarrito(): void {
    this._items.set([]);
  }
}