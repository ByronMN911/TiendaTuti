import { Component, signal, computed, OnInit, inject } from '@angular/core'; // <-- 1. Agregamos OnInit e inject
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { ApiService, Tienda } from '../../core/services/api';
import { ToastService } from '../../core/services/toast'; 

@Component({
  selector: 'app-locales',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './locales.html',
  styleUrl: './locales.css',
})
export class LocalesComponent implements OnInit { //Le decimos que usará OnInit
  
  // 3. Inyectamos tu servicio para poder hablar con Django
  private apiService = inject(ApiService);

  private toastService = inject(ToastService);  

  // caja vacía (Signal) esperando llenarse con los datos reales
  todasLasTiendas = signal<Tienda[]>([]);

  // Signals para el estado (Todo esto se queda igual)
  filtroProvincia = signal('Todas');
  tiendaSeleccionada = signal<Tienda | null>(null);
  center = signal({ lat: -1.8312, lng: -78.1834 }); // Centro del Ecuador
  zoom = signal(7);

  mapOptions: google.maps.MapOptions = {
    scrollwheel: true,
    mapTypeControl: false,
    streetViewControl: false
  };

  // como todasLasTiendas ahora es un Signal, lleva paréntesis ()
  tiendasFiltradas = computed(() => {
    const prov = this.filtroProvincia();
    const tiendas = this.todasLasTiendas(); // Leemos la caja
    
    return prov === 'Todas' ? tiendas : tiendas.filter(t => t.provincia === prov);
  });

  // se ejecuta apenas abres la página de locales
  ngOnInit() {
    // Llama a Django y pide la lista de locales
    this.apiService.getLocales().subscribe({
      next: (data) => {
        this.todasLasTiendas.set(data); // Metemos los datos reales en la caja
      },
      error: (err) => {
        console.error('Error cargando locales desde el backend', err);
        this.toastService.showError('Error de servidor: No se pudieron cargar los locales.');
      }
    });
  }

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
    this.zoom.set(16);
  }
}