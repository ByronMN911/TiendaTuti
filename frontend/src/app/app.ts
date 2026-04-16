import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para usar *ngIf
import { Api } from './api'; // Importamos el servicio de conexión

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  respuesta: any;

  // Inyectamos el servicio de conexión
  constructor(private apiService: Api) {}

  ngOnInit() {
    console.log("Intentando llamar al Backend ahora mismo..."); // AÑADE ESTO
    // Pedimos el saludo al backend de Django
    this.apiService.obtenerSaludo().subscribe({
      next: (data) => {
        this.respuesta = data;
        console.log('Conectado', data);
      },
      error: (error) => {
        console.error('Error de conexión:', error);
      }
    });
  }
}