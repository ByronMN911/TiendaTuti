import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/product-card/product-card';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8000/api';

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.API_URL}/productos/`);
  }

  // --- FUNCIÓN QUE FALTABA PARA EL PEDIDO ---
  crearPedido(pedidoData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/pedidos/`, pedidoData);
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.API_URL}/productos/?categoria=${categoria}`);
  }

  buscarProductos(query: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.API_URL}/productos/?search=${query}`);
  }
}