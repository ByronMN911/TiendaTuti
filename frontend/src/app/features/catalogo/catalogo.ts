// src/app/features/catalogo/catalogo.component.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api';
import { ProductCardComponent, Producto } from '../../shared/product-card/product-card';
import { SidebarCategoriasComponent } from '../../shared/sidebar-categorias/sidebar-categorias';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, SidebarCategoriasComponent],
  template: `
    <div class="container py-4">
      <div class="row g-4">

        <!-- Columna sidebar (se oculta en móvil) -->
        <div class="col-lg-2 col-md-3 d-none d-md-block">
          <app-sidebar-categorias
            [categorias]="todasLasCategorias()"
            [categoriaActiva]="categoriaFiltro()"
            (categoriaSeleccionada)="categoriaFiltro.set($event)"
          />
        </div>

        <!-- Columna principal con la grilla de productos -->
        <div class="col-lg-10 col-md-9">

          <!-- Encabezado del catálogo -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="catalogo-titulo mb-0">
              @if (categoriaFiltro()) {
                {{ categoriaFiltro() }}
              } @else {
                Todos los productos
              }
              <small class="text-muted fs-6 ms-2">
                ({{ productosFiltrados().length }} productos)
              </small>
            </h4>
          </div>

          <!-- Grilla responsiva de tarjetas -->
          @if (cargando()) {
            <!-- Estado de carga -->
            <div class="text-center py-5">
              <div class="spinner-border text-naranja" role="status">
                <span class="visually-hidden">Cargando...</span>
              </div>
              <p class="mt-2 text-muted">Cargando productos...</p>
            </div>
          } @else if (productosFiltrados().length === 0) {
            <!-- Sin resultados -->
            <div class="text-center py-5">
              <i class="bi bi-search" style="font-size: 3rem; color: var(--tuti-gris);"></i>
              <p class="mt-2 text-muted">No hay productos en esta categoría.</p>
            </div>
          } @else {
            <!-- Grid de productos -->
            <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3">
              @for (producto of productosFiltrados(); track producto.id) {
                <div class="col">
                  <app-product-card [producto]="producto" />
                </div>
              }
            </div>
          }

        </div>
      </div>
    </div>
  `,
  styles: [`
    .catalogo-titulo {
      font-weight: 700;
      color: var(--tuti-azul);
    }

    /* Spinner con color naranja de Tuti */
    .text-naranja {
      color: var(--tuti-naranja) !important;
    }
  `]
})
export class CatalogoComponent implements OnInit {
  private apiService = inject(ApiService);

  // Signals para estado del componente
  readonly productos  = signal<Producto[]>([]);
  readonly cargando   = signal(true);
  readonly categoriaFiltro = signal(''); // '' = todas

  // Computed: lista única de categorías a partir de los productos
  readonly todasLasCategorias = computed(() =>
    [...new Set(this.productos().map(p => p.categoria))].sort()
  );

  // Computed: productos filtrados por categoría activa
  readonly productosFiltrados = computed(() => {
    const cat = this.categoriaFiltro();
    return cat
      ? this.productos().filter(p => p.categoria === cat)
      : this.productos();
  });

  ngOnInit(): void {
    // Llamar a la API del backend de Byron para traer productos
    this.apiService.getProductos().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.cargando.set(false);
      }
    });
  }
}