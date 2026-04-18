// src/app/core/services/api.service.ts
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

  // URL base del backend Django de Byron (ajusta el puerto si es diferente)
  private readonly API_URL = 'http://localhost:8000/api';

  /** Obtiene todos los productos del backend */
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.API_URL}/productos/`);
  }

  /** Filtra productos por categoría (para el buscador de Mathew) */
  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.API_URL}/productos/?categoria=${categoria}`);
  }

  /** Busca productos por nombre (endpoint que preparará Mathew) */
  buscarProductos(query: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.API_URL}/productos/?search=${query}`);
  }
  getLocales(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(`${this.API_URL}/tiendas/`);
}
}