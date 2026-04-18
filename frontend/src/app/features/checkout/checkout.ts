// src/app/features/checkout/checkout.component.ts
import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart';
import { PasoCarritoComponent }
  from './steps/paso-carrito/paso-carrito';
import { PasoIdentificacionComponent }
  from './steps/paso-identificacion/paso-identificacion';
import { PasoEntregaComponent }
  from './steps/paso-entrega/paso-entrega';
import { PasoPagoComponent }
  from './steps/paso-pago/paso-pago';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    PasoCarritoComponent,
    PasoIdentificacionComponent,
    PasoEntregaComponent,
    PasoPagoComponent
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponent {
  private router     = inject(Router);
  private cartService = inject(CartService);

  // Paso actual (1-4)
  pasoActual = signal(1);

  // Metadatos de cada paso para el stepper visual
  readonly pasos = [
    { numero: 1, label: 'Carrito'        },
    { numero: 2, label: 'Identificación' },
    { numero: 3, label: 'Entrega'        },
    { numero: 4, label: 'Pago'           }
  ];

  irAlPaso(numero: number): void {
    this.pasoActual.set(numero);
    // Scroll suave al inicio para que el usuario vea el stepper
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmarPedido(): void {
    // Vaciar el carrito y redirigir a la página de confirmación
    this.cartService.vaciarCarrito();
    this.router.navigate(['/confirmacion']);
  }
}