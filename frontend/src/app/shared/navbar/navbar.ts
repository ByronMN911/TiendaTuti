// src/app/shared/navbar/navbar.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-tuti fixed-top shadow-sm">
      <div class="container">

        <a class="navbar-brand d-flex align-items-center gap-2" routerLink="/catalogo">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="8" fill="#F26522"/>
            <text x="18" y="25" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" fill="white">T</text>
          </svg>
          <span class="fw-bold" style="color: var(--tuti-azul); font-size: 1.3rem;">
            Tuti
          </span>
        </a>

        <div class="d-none d-md-flex flex-grow-1 mx-4">
          <div class="input-group">
            <input
              type="text"
              class="form-control buscador-input"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            />
            <button class="btn btn-naranja" type="button">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>

        <a routerLink="/locales" class="btn fw-bold me-2 text-decoration-none" style="color: var(--tuti-azul);">
          📍 Locales
        </a>

        <a routerLink="/checkout" class="btn btn-outline-azul position-relative ms-2">
          <i class="bi bi-cart3 fs-5"></i>
          @if (cartService.totalItems() > 0) {
            <span class="badge-carrito">
              {{ cartService.totalItems() }}
            </span>
          }
        </a>
      </div>
    </nav>
  `,
  styles: [`
    /* Fondo blanco limpio para el navbar */
    .navbar-tuti {
      background-color: var(--tuti-blanco);
      border-bottom: 2px solid var(--tuti-naranja);
      padding: 0.75rem 0;
    }

    /* Input de búsqueda con borde naranja al enfocar */
    .buscador-input:focus {
      border-color: var(--tuti-naranja);
      box-shadow: 0 0 0 0.2rem rgba(242, 101, 34, 0.20);
    }

    /* Botón naranja (color institucional) */
    .btn-naranja {
      background-color: var(--tuti-naranja);
      color: white;
      border-color: var(--tuti-naranja);
    }
    .btn-naranja:hover {
      background-color: var(--tuti-naranja-dark);
      color: white;
    }

    /* Botón outline azul para el carrito */
    .btn-outline-azul {
      border-color: var(--tuti-azul);
      color: var(--tuti-azul);
      border-radius: 8px;
    }
    .btn-outline-azul:hover {
      background-color: var(--tuti-azul);
      color: white;
    }

    /* Badge rojo encima del ícono del carrito */
    .badge-carrito {
      position: absolute;
      top: -6px;
      right: -6px;
      background-color: #dc3545;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: 0.7rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
  `]
})
export class NavbarComponent {
  protected readonly cartService = inject(CartService);
}