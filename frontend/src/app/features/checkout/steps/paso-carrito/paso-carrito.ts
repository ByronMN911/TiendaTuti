import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/services/cart';

@Component({
  selector: 'app-paso-carrito',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  template: `
    <h5 class="paso-titulo mb-4">
      <i class="bi bi-cart3 me-2"></i> Resumen de tu carrito
    </h5>

    @if (cartService.items().length === 0) {
      <div class="text-center py-5">
        <i class="bi bi-cart-x text-muted" style="font-size: 3rem;"></i>
        <h6 class="mt-3 text-muted">Tu carrito está vacío</h6>
        <p class="mb-4">Agrega productos del catálogo para continuar.</p>
        <a routerLink="/catalogo" class="btn btn-outline-primary">Volver al Catálogo</a>
      </div>
    } @else {
      <div class="table-responsive mb-4">
        <table class="table align-middle">
          <thead class="table-light">
            <tr>
              <th>Producto</th>
              <th class="text-center">Cantidad</th>
              <th class="text-end">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @for (item of cartService.items(); track item.id) {
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <img [src]="item.imagen" [alt]="item.nombre" width="50" height="50" class="object-fit-contain rounded border">
                    <div>
                      <h6 class="mb-0 fs-6">{{ item.nombre }}</h6>
                      <small class="text-muted">{{ item.precio | currency:'USD' }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-content-center align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary rounded-circle" (click)="cartService.cambiarCantidad(item.id, item.cantidad - 1)">-</button>
                    <span class="fw-bold px-2">{{ item.cantidad }}</span>
                    <button class="btn btn-sm btn-outline-secondary rounded-circle" (click)="cartService.cambiarCantidad(item.id, item.cantidad + 1)">+</button>
                  </div>
                </td>
                <td class="text-end fw-bold">
                  {{ (item.precio * item.cantidad) | currency:'USD' }}
                </td>
                <td class="text-end">
                  <button class="btn btn-sm text-danger" (click)="cartService.eliminarProducto(item.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            }
          </tbody>
          <tfoot class="table-light">
            <tr>
              <td colspan="2" class="text-end fw-bold">TOTAL:</td>
              <td class="text-end fw-bold fs-5" style="color: var(--tuti-naranja);">
                {{ cartService.totalPrecio() | currency:'USD' }}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="d-flex justify-content-end">
        <button class="btn btn-tuti-naranja" (click)="siguiente.emit()">
          Continuar con mis datos <i class="bi bi-arrow-right ms-1"></i>
        </button>
      </div>
    }
  `,
  styles: [`
    .paso-titulo { font-weight: 700; color: var(--tuti-azul); }
    .btn-tuti-naranja { background: var(--tuti-naranja); color: white; font-weight: 600; padding: 8px 24px; border-radius: 8px; }
    .btn-tuti-naranja:hover { background: var(--tuti-naranja-dark); color: white; }
  `]
})
export class PasoCarritoComponent {
  @Output() siguiente = new EventEmitter<void>();
  protected cartService = inject(CartService);
}