// src/app/shared/navbar/navbar.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CartService } from '../../core/services/cart';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  protected readonly cartService = inject(CartService);
  private router = inject(Router); 

  buscar(termino: string) {
    if (termino.trim()) {
      // Redirige a la página del catálogo y le pasa el término en la URL
      // Ejemplo: localhost:4200/catalogo?search=lacteos
      this.router.navigate(['/catalogo'], { queryParams: { search: termino } });
    }
  }
}