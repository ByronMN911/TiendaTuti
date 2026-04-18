import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-paso-entrega',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './paso-entrega.html',
  styleUrl: './paso-entrega.css'
})
export class PasoEntregaComponent {
  @Output() siguiente = new EventEmitter<any>();
  @Output() anterior  = new EventEmitter<void>();
  
  private fb = new FormBuilder();
  
  form = this.fb.group({
    provincia: ['', Validators.required],
    ciudad: ['', Validators.required],
    direccion: ['', Validators.required],
    referencia: ['']
  });

  onSiguiente(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.siguiente.emit({
        direccion_envio: this.form.value.direccion + ', ' + this.form.value.ciudad,
        metodo_envio: 'DOMICILIO' // o lo que corresponda
      });
    }
  }
}