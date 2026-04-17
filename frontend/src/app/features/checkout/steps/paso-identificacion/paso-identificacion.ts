// src/app/features/checkout/steps/paso-identificacion/paso-identificacion.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

// ─── Validador personalizado: Cédula Ecuatoriana ────────────────────────────
// Aplica el algoritmo módulo 10 del Registro Civil del Ecuador
function validarCedulaEcuatoriana(control: AbstractControl): ValidationErrors | null {
  const cedula = control.value as string;

  // 1. Debe tener exactamente 10 dígitos
  if (!cedula || cedula.length !== 10 || !/^\d{10}$/.test(cedula)) {
    return { cedulaInvalida: 'La cédula debe tener exactamente 10 dígitos numéricos.' };
  }

  // 2. Los dos primeros dígitos son la provincia (01-24)
  const provincia = parseInt(cedula.substring(0, 2), 10);
  if (provincia < 1 || provincia > 24) {
    return { cedulaInvalida: 'Código de provincia inválido (01-24).' };
  }

  // 3. Algoritmo módulo 10 (dígito verificador)
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2]; // alternados 2 y 1
  const digitoVerificador = parseInt(cedula[9], 10);  // último dígito

  let suma = 0;
  for (let i = 0; i < 9; i++) {
    let valor = parseInt(cedula[i], 10) * coeficientes[i];
    if (valor >= 10) valor -= 9; // si el resultado >= 10, restar 9
    suma += valor;
  }

  const residuo = suma % 10;
  const digitoCalculado = residuo === 0 ? 0 : 10 - residuo;

  if (digitoCalculado !== digitoVerificador) {
    return { cedulaInvalida: 'El número de cédula no es válido.' };
  }

  return null; // Cédula válida
}
// ────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-paso-identificacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h5 class="paso-titulo mb-4">
      <i class="bi bi-person-circle me-2"></i> Tus datos
    </h5>

    <form [formGroup]="form" (ngSubmit)="onSiguiente()" novalidate>
      <div class="row g-3">

        <!-- Email -->
        <div class="col-md-6">
          <label class="form-label form-label-tuti">Correo electrónico *</label>
          <input
            type="email"
            class="form-control form-control-tuti"
            [class.is-invalid]="mostrarError('email')"
            [class.is-valid]="form.get('email')?.valid && form.get('email')?.touched"
            formControlName="email"
            placeholder="tu@correo.com"
          />
          @if (mostrarError('email')) {
            <div class="invalid-feedback">
              {{ getError('email') }}
            </div>
          }
        </div>

        <!-- Teléfono -->
        <div class="col-md-6">
          <label class="form-label form-label-tuti">Teléfono *</label>
          <input
            type="tel"
            class="form-control form-control-tuti"
            [class.is-invalid]="mostrarError('telefono')"
            [class.is-valid]="form.get('telefono')?.valid && form.get('telefono')?.touched"
            formControlName="telefono"
            placeholder="0999123456"
          />
          @if (mostrarError('telefono')) {
            <div class="invalid-feedback">
              {{ getError('telefono') }}
            </div>
          }
        </div>

        <!-- Nombre -->
        <div class="col-md-6">
          <label class="form-label form-label-tuti">Nombre *</label>
          <input
            type="text"
            class="form-control form-control-tuti"
            [class.is-invalid]="mostrarError('nombre')"
            [class.is-valid]="form.get('nombre')?.valid && form.get('nombre')?.touched"
            formControlName="nombre"
            placeholder="María"
          />
          @if (mostrarError('nombre')) {
            <div class="invalid-feedback">{{ getError('nombre') }}</div>
          }
        </div>

        <!-- Apellido -->
        <div class="col-md-6">
          <label class="form-label form-label-tuti">Apellido *</label>
          <input
            type="text"
            class="form-control form-control-tuti"
            [class.is-invalid]="mostrarError('apellido')"
            [class.is-valid]="form.get('apellido')?.valid && form.get('apellido')?.touched"
            formControlName="apellido"
            placeholder="García"
          />
          @if (mostrarError('apellido')) {
            <div class="invalid-feedback">{{ getError('apellido') }}</div>
          }
        </div>

        <!-- Cédula con validación ecuatoriana -->
        <div class="col-md-6">
          <label class="form-label form-label-tuti">Cédula de identidad *</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control form-control-tuti"
              [class.is-invalid]="mostrarError('cedula')"
              [class.is-valid]="form.get('cedula')?.valid && form.get('cedula')?.touched"
              formControlName="cedula"
              placeholder="1712345678"
              maxlength="10"
            />
            <!-- Ícono de verificación -->
            @if (form.get('cedula')?.valid && form.get('cedula')?.touched) {
              <span class="input-group-text text-success">
                <i class="bi bi-check-circle-fill"></i>
              </span>
            }
          </div>
          @if (mostrarError('cedula')) {
            <div class="invalid-feedback d-block">
              {{ getError('cedula') }}
            </div>
          }
          <div class="form-text">10 dígitos. Se verifica el dígito de control del Registro Civil.</div>
        </div>

      </div>

      <!-- Botones de navegación -->
      <div class="d-flex justify-content-between mt-4">
        <button type="button" class="btn btn-outline-secondary" (click)="anterior.emit()">
          <i class="bi bi-arrow-left me-1"></i> Volver
        </button>
        <button type="submit" class="btn btn-tuti-naranja">
          Continuar <i class="bi bi-arrow-right ms-1"></i>
        </button>
      </div>

    </form>
  `,
  styles: [`
    .paso-titulo {
      font-weight: 700;
      color: var(--tuti-azul);
    }

    .form-label-tuti {
      font-weight: 600;
      font-size: 0.88rem;
      color: #444;
    }

    /* Borde naranja al enfocar los inputs */
    .form-control-tuti:focus {
      border-color: var(--tuti-naranja);
      box-shadow: 0 0 0 0.2rem rgba(242, 101, 34, 0.20);
    }

    .btn-tuti-naranja {
      background: var(--tuti-naranja);
      color: white;
      border: none;
      font-weight: 600;
      padding: 8px 24px;
      border-radius: 8px;
    }
    .btn-tuti-naranja:hover {
      background: var(--tuti-naranja-dark);
      color: white;
    }
  `]
})
export class PasoIdentificacionComponent {
  @Output() siguiente = new EventEmitter<void>();
  @Output() anterior  = new EventEmitter<void>();

  private fb = new FormBuilder();

  // Formulario reactivo con todas las validaciones
  form = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    nombre: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    apellido: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    cedula: ['', [
      Validators.required,
      validarCedulaEcuatoriana  // ← Nuestro validador personalizado
    ]],
    telefono: ['', [
      Validators.required,
      Validators.pattern(/^09\d{8}$/) // Formato: 09XXXXXXXX (10 dígitos)
    ]]
  });

  /** Verifica si debe mostrarse el error de un campo */
  mostrarError(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.invalid && control?.touched);
  }

  /** Retorna el mensaje de error apropiado para cada campo */
  getError(campo: string): string {
    const errors = this.form.get(campo)?.errors;
    if (!errors) return '';

    const mensajes: Record<string, Record<string, string>> = {
      email: {
        required: 'El correo es obligatorio.',
        email:    'Ingresa un correo electrónico válido.'
      },
      nombre: {
        required:  'El nombre es obligatorio.',
        minlength: 'El nombre debe tener al menos 2 caracteres.'
      },
      apellido: {
        required:  'El apellido es obligatorio.',
        minlength: 'El apellido debe tener al menos 2 caracteres.'
      },
      cedula: {
        required:       'La cédula es obligatoria.',
        cedulaInvalida: errors['cedulaInvalida'] as string
      },
      telefono: {
        required: 'El teléfono es obligatorio.',
        pattern:  'Formato inválido. Usa: 09XXXXXXXX (10 dígitos).'
      }
    };

    const campoMensajes = mensajes[campo] || {};
    const primerError   = Object.keys(errors)[0];
    return campoMensajes[primerError] || 'Campo inválido.';
  }

  onSiguiente(): void {
    // Marcar todos como tocados para mostrar errores
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.siguiente.emit();
    }
  }
}