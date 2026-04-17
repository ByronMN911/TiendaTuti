// src/app/shared/sidebar-categorias/sidebar-categorias.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-categorias',
  standalone: true,
  template: `
    <div class="sidebar-card">
      <h6 class="sidebar-titulo">
        <i class="bi bi-grid me-2"></i> Categorías
      </h6>

      <ul class="sidebar-list list-unstyled mb-0">
        <!-- Opción "Todas" -->
        <li>
          <button
            class="sidebar-item w-100 text-start"
            [class.sidebar-item--active]="categoriaActiva === ''"
            (click)="seleccionarCategoria('')"
          >
            <i class="bi bi-house me-2"></i> Todas
          </button>
        </li>

        <!-- Una opción por cada categoría recibida como input -->
        @for (cat of categorias; track cat) {
          <li>
            <button
              class="sidebar-item w-100 text-start"
              [class.sidebar-item--active]="categoriaActiva === cat"
              (click)="seleccionarCategoria(cat)"
            >
              <i class="bi bi-tag me-2"></i> {{ cat }}
            </button>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .sidebar-card {
      background: white;
      border-radius: var(--tuti-radio);
      box-shadow: var(--tuti-sombra);
      padding: 16px;
      position: sticky;
      top: 82px; /* Se queda "pegado" debajo del navbar fijo */
    }

    .sidebar-titulo {
      font-weight: 700;
      color: var(--tuti-azul);
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--tuti-naranja);
    }

    .sidebar-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .sidebar-item {
      background: none;
      border: none;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 0.9rem;
      color: #2d2d2d;
      cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease;
    }

    .sidebar-item:hover {
      background-color: #fff3ec;
      color: var(--tuti-naranja);
    }

    /* Categoría activa resaltada */
    .sidebar-item--active {
      background-color: var(--tuti-naranja) !important;
      color: white !important;
      font-weight: 600;
    }
  `]
})
export class SidebarCategoriasComponent {
  // Lista de categorías que llega desde el componente padre (catálogo)
  @Input() categorias: string[] = [];

  // Categoría actualmente seleccionada
  @Input() categoriaActiva = '';

  // Evento que emite la categoría elegida al padre
  @Output() categoriaSeleccionada = new EventEmitter<string>();

  seleccionarCategoria(cat: string): void {
    this.categoriaSeleccionada.emit(cat);
  }
}