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
  template: `
    <div class="container py-4">
      <h3 class="checkout-titulo mb-4">
        <i class="bi bi-bag-check me-2"></i> Tu pedido
      </h3>

      <!-- Indicador de pasos (stepper visual) -->
      <div class="stepper mb-4">
        @for (paso of pasos; track paso.numero) {
          <div
            class="stepper__paso"
            [class.stepper__paso--activo]="pasoActual() === paso.numero"
            [class.stepper__paso--completado]="pasoActual() > paso.numero"
          >
            <!-- Círculo del número de paso -->
            <div class="stepper__circulo">
              @if (pasoActual() > paso.numero) {
                <i class="bi bi-check-lg"></i>
              } @else {
                {{ paso.numero }}
              }
            </div>
            <!-- Etiqueta del paso -->
            <span class="stepper__label d-none d-sm-inline">{{ paso.label }}</span>
          </div>

          <!-- Línea conectora entre pasos (excepto después del último) -->
          @if (paso.numero < pasos.length) {
            <div class="stepper__linea"
                 [class.stepper__linea--completada]="pasoActual() > paso.numero">
            </div>
          }
        }
      </div>

      <!-- Contenido del paso activo -->
      <div class="checkout-panel">
        @switch (pasoActual()) {
          @case (1) {
            <app-paso-carrito
              (siguiente)="irAlPaso(2)"
            />
          }
          @case (2) {
            <app-paso-identificacion
              (anterior)="irAlPaso(1)"
              (siguiente)="irAlPaso(3)"
            />
          }
          @case (3) {
            <app-paso-entrega
              (anterior)="irAlPaso(2)"
              (siguiente)="irAlPaso(4)"
            />
          }
          @case (4) {
            <app-paso-pago
              (anterior)="irAlPaso(3)"
              (confirmar)="confirmarPedido()"
            />
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .checkout-titulo {
      font-weight: 700;
      color: var(--tuti-azul);
    }

    /* Stepper horizontal */
    .stepper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
    }

    .stepper__paso {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    /* Círculo numerado */
    .stepper__circulo {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #e9ecef;
      color: #6c757d;
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #dee2e6;
      transition: all 0.3s ease;
    }

    /* Paso activo: naranja */
    .stepper__paso--activo .stepper__circulo {
      background: var(--tuti-naranja);
      color: white;
      border-color: var(--tuti-naranja);
      transform: scale(1.1);
    }

    /* Paso completado: azul con check */
    .stepper__paso--completado .stepper__circulo {
      background: var(--tuti-azul);
      color: white;
      border-color: var(--tuti-azul);
    }

    .stepper__label {
      font-size: 0.75rem;
      color: var(--tuti-gris);
      font-weight: 500;
    }

    .stepper__paso--activo .stepper__label {
      color: var(--tuti-naranja);
      font-weight: 700;
    }

    .stepper__paso--completado .stepper__label {
      color: var(--tuti-azul);
    }

    /* Línea conectora */
    .stepper__linea {
      flex: 1;
      height: 2px;
      background: #dee2e6;
      margin: 0 4px;
      margin-bottom: 20px; /* alinear con los círculos */
      transition: background-color 0.3s ease;
    }

    .stepper__linea--completada {
      background: var(--tuti-azul);
    }

    /* Panel blanco donde va el contenido de cada paso */
    .checkout-panel {
      background: white;
      border-radius: var(--tuti-radio);
      box-shadow: var(--tuti-sombra);
      padding: 24px;
    }
  `]
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