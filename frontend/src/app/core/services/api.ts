import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/product-card/product-card';

export interface Tienda {
  id: number;
  nombre: string;
  provincia: string;
  ciudad: string;
  direccion: string;
  lat: number;
  lng: number;
}

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
  getLocales(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(`${this.API_URL}/tiendas/`);
}
}