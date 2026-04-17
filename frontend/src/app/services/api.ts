import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // Obtener el catálogo
  getProductos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/productos/`);
  }

  // Enviar el pedido del Guest Checkout
  crearPedido(pedidoData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pedidos/`, pedidoData);
  }
}