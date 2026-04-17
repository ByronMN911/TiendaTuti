// src/app/features/checkout/confirmacion/confirmacion.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  template: `
    <div class="container py-5">
      <div class="confirmacion-card mx-auto">

        <!-- Ícono de éxito animado -->
        <div class="confirmacion-icono">
          <i class="bi bi-check-circle-fill"></i>
        </div>

        <!-- Título -->
        <h2 class="confirmacion-titulo">¡Gracias por tu compra!</h2>
        <p class="text-muted mb-1">Tu pedido ha sido registrado exitosamente.</p>
        <p class="text-muted">
          Número de pedido:
          <strong class="text-azul">#{{ numeroPedido }}</strong>
        </p>

        <!-- Fecha -->
        <p class="text-muted mb-4">
          <i class="bi bi-calendar3 me-1"></i>
          {{ fechaActual | date:'dd/MM/yyyy HH:mm' }}
        </p>

        <!-- Acciones -->
        <div class="d-flex gap-3 justify-content-center flex-wrap">
          <button class="btn btn-imprimir" (click)="imprimirRecibo()">
            <i class="bi bi-printer me-2"></i> Imprimir recibo
          </button>
          <a routerLink="/catalogo" class="btn btn-seguir">
            <i class="bi bi-shop me-2"></i> Seguir comprando
          </a>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .confirmacion-card {
      background: white;
      border-radius: 16px;
      box-shadow: var(--tuti-sombra);
      padding: 48px 32px;
      text-align: center;
      max-width: 480px;
    }

    /* Ícono verde grande con animación de escala */
    .confirmacion-icono {
      font-size: 5rem;
      color: #198754;
      margin-bottom: 16px;
      animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    }

    @keyframes popIn {
      from { transform: scale(0); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }

    .confirmacion-titulo {
      font-weight: 700;
      color: var(--tuti-azul);
      margin-bottom: 8px;
    }

    .text-azul { color: var(--tuti-azul); }

    .btn-imprimir {
      background: var(--tuti-azul);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      padding: 10px 24px;
    }
    .btn-imprimir:hover {
      background: var(--tuti-azul-dark);
      color: white;
    }

    .btn-seguir {
      background: var(--tuti-naranja);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      padding: 10px 24px;
    }
    .btn-seguir:hover {
      background: var(--tuti-naranja-dark);
      color: white;
    }
  `]
})
export class ConfirmacionComponent {
  readonly fechaActual  = new Date();
  // Número de pedido simulado (en producción vendría del backend)
  readonly numeroPedido = Math.floor(Math.random() * 90000) + 10000;

  imprimirRecibo(): void {
    // Abre el diálogo de impresión del navegador
    window.print();
  }
}