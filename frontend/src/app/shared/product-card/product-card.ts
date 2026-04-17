// src/app/shared/product-card/product-card.component.ts
import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart';

export interface Producto {
  id:         number;
  nombre:     string;
  precio:     number;
  imagen:     string;    // URL o ruta de la imagen
  categoria:  string;
  descripcion?: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="product-card h-100">

      <!-- Imagen del producto -->
      <div class="product-card__img-wrapper">
        <img
          [src]="producto.imagen"
          [alt]="producto.nombre"
          class="product-card__img"
          loading="lazy"
        />
        <!-- Badge con la categoría -->
        <span class="product-card__categoria">{{ producto.categoria }}</span>
      </div>

      <!-- Cuerpo de la tarjeta -->
      <div class="product-card__body">
        <h6 class="product-card__nombre">{{ producto.nombre }}</h6>

        <!-- Precio con pipe currency de Angular -->
        <p class="product-card__precio">
          {{ producto.precio | currency:'USD':'symbol':'1.2-2' }}
        </p>

        <!-- Botón para añadir al carrito -->
        <button
          class="btn product-card__btn w-100"
          (click)="agregarAlCarrito()"
          [class.product-card__btn--added]="recienAgregado"
        >
          @if (recienAgregado) {
            <!-- Feedback visual de "añadido" -->
            <i class="bi bi-check-lg me-1"></i> ¡Añadido!
          } @else {
            <i class="bi bi-cart-plus me-1"></i> Añadir al carrito
          }
        </button>
      </div>
    </div>
  `,
  styles: [`
    /* Tarjeta base */
    .product-card {
      background: white;
      border-radius: var(--tuti-radio);
      box-shadow: var(--tuti-sombra);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    /* Efecto hover: sube ligeramente */
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
    }

    /* Contenedor de imagen con altura fija */
    .product-card__img-wrapper {
      position: relative;
      height: 180px;
      background: #f5f5f5;
      overflow: hidden;
    }

    .product-card__img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 12px;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-card__img {
      transform: scale(1.05);
    }

    /* Badge de categoría sobre la imagen */
    .product-card__categoria {
      position: absolute;
      top: 8px;
      left: 8px;
      background: var(--tuti-azul);
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    /* Cuerpo */
    .product-card__body {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .product-card__nombre {
      font-size: 0.95rem;
      font-weight: 600;
      color: #2d2d2d;
      margin: 0;
      line-height: 1.3;
      /* Limita a 2 líneas y agrega "..." */
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-card__precio {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--tuti-naranja);
      margin: 0;
    }

    /* Botón principal naranja */
    .product-card__btn {
      background-color: var(--tuti-naranja);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      padding: 8px;
      margin-top: auto;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .product-card__btn:hover {
      background-color: var(--tuti-naranja-dark);
      color: white;
      transform: scale(1.02);
    }

    /* Estado "recién añadido": se pone verde brevemente */
    .product-card__btn--added {
      background-color: #198754 !important;
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) producto!: Producto;

  private cartService = inject(CartService);

  // Flag para el feedback visual de "añadido"
  recienAgregado = false;

  agregarAlCarrito(): void {
    // Añadir al carrito via el service
    this.cartService.agregarProducto({
      id:     this.producto.id,
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      imagen: this.producto.imagen
    });

    // Mostrar "¡Añadido!" por 1.5 segundos y volver al estado normal
    this.recienAgregado = true;
    setTimeout(() => { this.recienAgregado = false; }, 1500);
  }
}