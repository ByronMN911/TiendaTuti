import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api';
import { ProductCardComponent, Producto } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  template: `
    <section class="hero-section text-center text-white d-flex align-items-center justify-content-center">
      <div class="hero-content p-4">
        <h1 class="display-4 fw-bold mb-3">La calidad cuesta menos...</h1>
        <p class="lead mb-4">Descubre nuestras ofertas exclusivas para este fin de semana en todas nuestras categorías.</p>
        <a routerLink="/catalogo" class="btn btn-tuti-naranja btn-lg px-5 py-3 fw-bold hero-btn">
          Ver Catálogo Completo <i class="bi bi-arrow-right ms-2"></i>
        </a>
      </div>
    </section>

    <section class="container my-5 text-center">
      <h3 class="mb-4 text-tuti-azul fw-bold">Explora por Categorías</h3>
      <div class="row justify-content-center g-3">
        <div class="col-6 col-md-3 col-lg-2">
          <div class="category-box" routerLink="/catalogo">
            <i class="bi bi-cup-straw fs-1 text-tuti-naranja"></i>
            <h6 class="mt-2 fw-bold text-dark">Lácteos</h6>
          </div>
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <div class="category-box" routerLink="/catalogo">
            <i class="bi bi-egg-fried fs-1 text-tuti-naranja"></i>
            <h6 class="mt-2 fw-bold text-dark">Desayuno</h6>
          </div>
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <div class="category-box" routerLink="/catalogo">
            <i class="bi bi-basket2 fs-1 text-tuti-naranja"></i>
            <h6 class="mt-2 fw-bold text-dark">Despensa</h6>
          </div>
        </div>
        <div class="col-6 col-md-3 col-lg-2">
          <div class="category-box" routerLink="/catalogo">
            <i class="bi bi-droplet fs-1 text-tuti-naranja"></i>
            <h6 class="mt-2 fw-bold text-dark">Limpieza</h6>
          </div>
        </div>
      </div>
    </section>

    <section class="container my-5 pb-5">
      <div class="d-flex justify-content-between align-items-end mb-4">
        <h3 class="text-tuti-azul fw-bold mb-0">Productos Destacados 🌟</h3>
        <a routerLink="/catalogo" class="text-tuti-naranja fw-bold text-decoration-none">Ver todos</a>
      </div>
      
      @if (cargando()) {
        <div class="text-center py-5">
          <div class="spinner-border text-naranja" role="status"></div>
        </div>
      } @else {
        <div class="row row-cols-2 row-cols-md-4 g-4">
          @for (prod of destacados(); track prod.id) {
            <div class="col">
              <app-product-card [producto]="prod" />
            </div>
          }
        </div>
      }
    </section>
  `,
  styles: [`
    /* Colores locales por si no están en tu :root */
    .text-tuti-azul { color: var(--tuti-azul, #003DA5); }
    .text-tuti-naranja { color: var(--tuti-naranja, #F26522); }
    .btn-tuti-naranja { 
      background-color: var(--tuti-naranja, #F26522); 
      color: white; 
      border-radius: 30px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn-tuti-naranja:hover {
      background-color: var(--tuti-naranja-dark, #d4541a);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(242, 101, 34, 0.4);
    }

    /* Diseño del Banner con un degradado azul institucional */
    .hero-section {
      height: 450px;
      background: linear-gradient(135deg, rgba(0, 61, 165, 0.95) 0%, rgba(0, 45, 122, 0.95) 100%), url('https://via.placeholder.com/1200x500/003DA5/ffffff?text=Fondo+Tuti') center/cover;
      border-radius: 0 0 40px 40px;
      margin-bottom: 2rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .hero-content {
      max-width: 800px;
    }

    /* Cajas de categoría limpias con hover sutil */
    .category-box {
      background: white;
      border-radius: 16px;
      padding: 20px 10px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid #eee;
      transition: all 0.3s ease;
    }

    .category-box:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      border-color: var(--tuti-naranja, #F26522);
    }

    .spinner-border.text-naranja {
      color: var(--tuti-naranja, #F26522) !important;
    }
  `]
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);
  
  destacados = signal<Producto[]>([]);
  cargando = signal(true);

  ngOnInit(): void {
    // Simulamos traer solo 4 productos para la pantalla principal
    this.apiService.getProductos().subscribe({
      next: (data) => {
        // Tomamos los primeros 4 del array que envía el backend
        this.destacados.set(data.slice(0, 4));
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar destacados', err);
        this.cargando.set(false);
      }
    });
  }
}