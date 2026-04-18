import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common'; // Importamos CommonModule para seguridad

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe], 
  templateUrl: './confirmacion.html',
  styleUrl: './confirmacion.css'
})
export class ConfirmacionComponent {
  readonly fechaActual  = new Date();
  readonly numeroPedido = Math.floor(Math.random() * 90000) + 10000;

  imprimirRecibo(): void {
    window.print();
  }
}
