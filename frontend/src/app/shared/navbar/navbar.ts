import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router'; // Mantenemos los 3 de Génesis
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html', // Versión HEAD
  styleUrl: './navbar.css'      // Versión HEAD
})
export class NavbarComponent {
  protected readonly cartService = inject(CartService);
  private router = inject(Router); 

  buscar(termino: string) {
    if (termino.trim()) {
      // Redirige al catálogo con el parámetro de búsqueda
      this.router.navigate(['/catalogo'], { queryParams: { search: termino } });
    }
  }
}