import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

interface Tienda {
  id: number;
  nombre: string;
  provincia: string;
  ciudad: string;
  direccion: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <div class="container-fluid py-4 bg-light">
      <div class="row g-4">
        
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm p-4 h-100">
            <h4 class="text-tuti-azul fw-bold mb-4">📍 Encuentra tu Tuti</h4>
            
            <div class="mb-3">
              <label class="form-label fw-bold">Provincia</label>
              <select class="form-select form-control-tuti" (change)="cambiarProvincia($event)">
                <option value="Todas">Todas las provincias</option>
                <option value="Pichincha">Pichincha</option>
                <option value="Guayas">Guayas</option>
              </select>
            </div>

            <hr>

            <div class="locales-lista overflow-auto" style="max-height: 500px;">
              @for (tienda of tiendasFiltradas(); track tienda.id) {
                <div class="tienda-item p-3 mb-2 rounded" 
                     [class.active]="tiendaSeleccionada()?.id === tienda.id"
                     (click)="seleccionarTienda(tienda)">
                  <h6 class="fw-bold mb-1">{{ tienda.nombre }}</h6>
                  <p class="small text-muted mb-0"><i class="bi bi-geo-alt"></i> {{ tienda.direccion }}</p>
                  <p class="small text-tuti-azul mb-0 fw-bold">{{ tienda.ciudad }}</p>
                </div>
              } @empty {
                <p class="text-center text-muted py-4">No hay tiendas en esta ubicación.</p>
              }
            </div>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="card border-0 shadow-sm overflow-hidden" style="height: 650px;">
            <google-map 
              height="650px" 
              width="100%" 
              style="display: block; height: 650px;"
              [center]="center()" 
              [zoom]="zoom()"
              [options]="mapOptions">
              
              @for (tienda of tiendasFiltradas(); track tienda.id) {
                <map-marker 
                  [position]="{lat: tienda.lat, lng: tienda.lng}"
                  [title]="tienda.nombre"
                  (mapClick)="seleccionarTienda(tienda)">
                </map-marker>
              }
            </google-map>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .text-tuti-azul { color: #003DA5; }
    .form-control-tuti:focus { border-color: #F26522; box-shadow: 0 0 0 0.2rem rgba(242, 101, 34, 0.2); }
    
    .tienda-item {
      cursor: pointer;
      border: 1px solid #eee;
      transition: all 0.2s ease;
      background: white;
    }
    
    .tienda-item:hover { border-color: #F26522; background: #fffaf7; }
    .tienda-item.active { border-color: #003DA5; background: #eef4ff; border-left: 5px solid #003DA5; }

    .locales-lista::-webkit-scrollbar { width: 6px; }
    .locales-lista::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
  `]
})
export class LocalesComponent {
  // Datos simulados (Puedes mover esto a un servicio después)
  private readonly todasLasTiendas: Tienda[] = [
    { id: 1, nombre: 'Tuti La Floresta', provincia: 'Pichincha', ciudad: 'Quito', direccion: 'Av. Coruña y Lérida', lat: -0.2104, lng: -78.4842 },
    { id: 2, nombre: 'Tuti Quitumbe', provincia: 'Pichincha', ciudad: 'Quito', direccion: 'Av. Quitumbe Ñan', lat: -0.3015, lng: -78.5583 },
    { id: 3, nombre: 'Tuti Urdesa', provincia: 'Guayas', ciudad: 'Guayaquil', direccion: 'Av. Víctor Emilio Estrada', lat: -2.1648, lng: -79.9123 },
    { id: 4, nombre: 'Tuti Samborondón', provincia: 'Guayas', ciudad: 'Guayaquil', direccion: 'Km 1.5 Av. Samborondón', lat: -2.1432, lng: -79.8665 },
  ];

  // Signals para el estado
  filtroProvincia = signal('Todas');
  tiendaSeleccionada = signal<Tienda | null>(null);
  center = signal({ lat: -1.8312, lng: -78.1834 }); // Centro del Ecuador
  zoom = signal(7);

  mapOptions: google.maps.MapOptions = {
    scrollwheel: true,
    mapTypeControl: false,
    streetViewControl: false
  };

  tiendasFiltradas = computed(() => {
    const prov = this.filtroProvincia();
    return prov === 'Todas' ? this.todasLasTiendas : this.todasLasTiendas.filter(t => t.provincia === prov);
  });

  cambiarProvincia(event: Event) {
    const valor = (event.target as HTMLSelectElement).value;
    this.filtroProvincia.set(valor);
    
    // Re-centrar mapa según provincia
    if (valor === 'Pichincha') this.center.set({ lat: -0.2299, lng: -78.5249 });
    if (valor === 'Guayas') this.center.set({ lat: -2.1894, lng: -79.8891 });
    this.zoom.set(11);
  }

  seleccionarTienda(tienda: Tienda) {
    this.tiendaSeleccionada.set(tienda);
    this.center.set({ lat: tienda.lat, lng: tienda.lng });
    this.zoom.set(16); // Zoom de calle para ver el local
  }
}