import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-paso-entrega',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h5 class="paso-titulo mb-4">
      <i class="bi bi-truck me-2"></i> Datos de Entrega
    </h5>

    <form [formGroup]="form" (ngSubmit)="onSiguiente()">
      <div class="row g-3">
        
        <div class="col-md-6">
          <label class="form-label form-label-tuti">Provincia *</label>
          <select class="form-select form-control-tuti" formControlName="provincia" [class.is-invalid]="form.get('provincia')?.invalid && form.get('provincia')?.touched">
            <option value="">Selecciona una provincia</option>
            <option value="Pichincha">Pichincha</option>
            <option value="Guayas">Guayas</option>
            <option value="Azuay">Azuay</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label form-label-tuti">Ciudad *</label>
          <input type="text" class="form-control form-control-tuti" formControlName="ciudad" placeholder="Ej. Quito" [class.is-invalid]="form.get('ciudad')?.invalid && form.get('ciudad')?.touched">
        </div>

        <div class="col-12">
          <label class="form-label form-label-tuti">Dirección Principal *</label>
          <input type="text" class="form-control form-control-tuti" formControlName="direccion" placeholder="Calle principal y número" [class.is-invalid]="form.get('direccion')?.invalid && form.get('direccion')?.touched">
        </div>

        <div class="col-12">
          <label class="form-label form-label-tuti">Referencia</label>
          <input type="text" class="form-control form-control-tuti" formControlName="referencia" placeholder="Frente a un parque, casa azul...">
        </div>
      </div>

      <div class="d-flex justify-content-between mt-4">
        <button type="button" class="btn btn-outline-secondary" (click)="anterior.emit()">
          <i class="bi bi-arrow-left me-1"></i> Volver
        </button>
        <button type="submit" class="btn btn-tuti-naranja">
          Ir al Pago <i class="bi bi-arrow-right ms-1"></i>
        </button>
      </div>
    </form>
  `,
  styles: [`
    .paso-titulo { font-weight: 700; color: var(--tuti-azul); }
    .form-label-tuti { font-weight: 600; font-size: 0.88rem; color: #444; }
    .form-control-tuti:focus { border-color: var(--tuti-naranja); box-shadow: 0 0 0 0.2rem rgba(242, 101, 34, 0.20); }
    .btn-tuti-naranja { background: var(--tuti-naranja); color: white; font-weight: 600; padding: 8px 24px; border-radius: 8px; }
  `]
})
export class PasoEntregaComponent {
  @Output() siguiente = new EventEmitter<void>();
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
    if (this.form.valid) this.siguiente.emit();
  }
}