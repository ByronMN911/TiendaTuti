import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api';
import { ProductCardComponent, Producto } from '../../shared/product-card/product-card';
import { ToastService } from '../../core/services/toast'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);
  private toastService = inject(ToastService);
  
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
        this.toastService.showError('Error de servidor: No pudo cargar.');
        this.cargando.set(false);
      }
    });
  }
}