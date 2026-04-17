import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal privado que guarda los productos
  private cartItems = signal<any[]>([]);

  // Señal computada para saber cuántos items hay (para mostrar en el Navbar)
  totalItems = computed(() => this.cartItems().length);

  // Método para agregar un producto
  addToCart(product: any) {
    this.cartItems.update(items => [...items, product]);
  }

  // Método para leer el carrito
  getItems() {
    return this.cartItems();
  }
}