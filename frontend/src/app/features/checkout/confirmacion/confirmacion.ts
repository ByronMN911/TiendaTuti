// src/app/features/checkout/confirmacion/confirmacion.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.css'
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