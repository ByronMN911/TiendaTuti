// src/app/features/catalogo/catalogo.component.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api';
import { ProductCardComponent, Producto } from '../../shared/product-card/product-card';
import { SidebarCategoriasComponent } from '../../shared/sidebar-categorias/sidebar-categorias';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../core/services/toast';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, SidebarCategoriasComponent],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {
  private apiService = inject(ApiService);

  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

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
    // 1. Escuchamos si la URL cambia (por ejemplo, si entra una búsqueda)
    this.route.queryParams.subscribe(params => {
      const termino = params['search']; // Captura lo que dice ?search=...
      
      this.cargando.set(true); // Mostramos el spinner naranja

      if (termino) {
        // 2A. SI HAY BÚSQUEDA: Limpiamos la categoría activa y llamamos al backend para buscar
        this.categoriaFiltro.set(''); 
        
        this.apiService.buscarProductos(termino).subscribe({
          next: (data) => {
            // Filtramos la lista para que solo queden los productos cuyo nombre incluya lo que escribiste
            const productosEncontrados = data.filter(producto => 
              producto.nombre.toLowerCase().includes(termino.toLowerCase())
            );
            
            // Guardamos solo los filtrados en nuestra signal
            this.productos.set(productosEncontrados);
            this.cargando.set(false);
          },
          error: (err) => {
            console.error('Error al buscar:', err);
            this.cargando.set(false);
          }
        });
      } else {
        // 2B. SI NO HAY BÚSQUEDA: Traemos todo el catálogo normal
        this.apiService.getProductos().subscribe({
          next: (data) => {
            this.productos.set(data);
            this.cargando.set(false);
          },
          error: (err) => {
            console.error('Error al cargar catálogo:', err);
            this.toastService.showError('Error de servidor: No se pudieron cargar los productos.');
            this.cargando.set(false);
          }
        });
      }
    });
  }
}