
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer-tuti mt-5">
      <div class="container py-4">
        <div class="row gy-3">

          <!-- Columna 1: Marca y descripción -->
          <div class="col-md-4">
            <h5 class="footer-titulo">Tuti Supermercados</h5>
            <p class="footer-texto">
              Tu supermercado de confianza en Ecuador.
              Calidad y frescura a tu puerta.
            </p>
          </div>

          <!-- Columna 2: Contacto -->
          <div class="col-md-4">
            <h6 class="footer-subtitulo">Contacto</h6>
            <ul class="list-unstyled footer-texto">
              <li><i class="bi bi-telephone me-2"></i> 1800-TUTI (1800-8884)</li>
              <li><i class="bi bi-envelope me-2"></i> contacto&#64;tuti.com.ec</li>
              <li><i class="bi bi-geo-alt me-2"></i> Quito, Ecuador</li>
            </ul>
          </div>

          <!-- Columna 3: Métodos de pago -->
          <div class="col-md-4">
            <h6 class="footer-subtitulo">Métodos de pago</h6>
            <div class="d-flex gap-2 flex-wrap">
              <span class="pago-badge"><i class="bi bi-credit-card me-1"></i>Visa</span>
              <span class="pago-badge"><i class="bi bi-credit-card me-1"></i>Mastercard</span>
              <span class="pago-badge"><i class="bi bi-cash me-1"></i>Efectivo</span>
              <span class="pago-badge"><i class="bi bi-phone me-1"></i>Transferencia</span>
            </div>
          </div>

        </div>

        <!-- Línea divisoria + copyright -->
        <hr class="footer-hr mt-3 mb-2">
        <p class="text-center footer-texto mb-0">
          © {{ currentYear }} Tuti Supermercados — Proyecto académico
        </p>
      </div>
    </footer>
  `,
  styles: [`
    .footer-tuti {
      background-color: var(--tuti-azul);
      color: white;
    }
    .footer-titulo {
      color: var(--tuti-naranja);
      font-weight: 700;
    }
    .footer-subtitulo {
      color: #aac4f0;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 0.05em;
    }
    .footer-texto {
      color: #d0dff5;
      font-size: 0.9rem;
    }
    .footer-hr {
      border-color: rgba(255,255,255,0.2);
    }
    .pago-badge {
      background: rgba(255,255,255,0.15);
      color: white;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 0.8rem;
      border: 1px solid rgba(255,255,255,0.25);
    }
  `]
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
