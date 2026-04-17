import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent {
  private router = inject(Router);
  protected cartService = inject(CartService);

  pasoActual = signal(1);
  
  datosPedido = signal<any>({
    email: '',
    nombre: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    metodo_envio: 'TIENDA',
    direccion_envio: ''
  });

  readonly pasos = [
    { numero: 1, label: 'Carrito' },
    { numero: 2, label: 'Identificación' },
    { numero: 3, label: 'Entrega' },
    { numero: 4, label: 'Pago' }
  ];

  irAlPaso(numero: number, datosFormulario?: any): void {
    if (datosFormulario) {
      this.datosPedido.update(actual => ({ ...actual, ...datosFormulario }));
    }
    this.pasoActual.set(numero);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmarPedido(): void {
    console.log('Enviando pedido...', this.datosPedido());
    
    this.cartService.finalizarCompra(this.datosPedido()).subscribe({
      next: (respuesta: any) => { // Agregamos el tipo :any
        console.log('Pedido exitoso:', respuesta);
        this.cartService.vaciarCarrito();
        this.router.navigate(['/confirmacion']);
      },
      error: (error: any) => { // Agregamos el tipo :any
        console.error('Error:', error);
        alert('Error al conectar con el servidor.');
      }
    });
  }
}