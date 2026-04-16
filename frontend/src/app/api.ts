import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importante para las peticiones

@Injectable({
  providedIn: 'root',
})
export class Api {
  // Definimos la URL de tu servidor Django
  private url = 'http://localhost:8000/api/saludo/';

  constructor(private http: HttpClient) { }

  obtenerSaludo() {
    return this.http.get(this.url);
  }
}
