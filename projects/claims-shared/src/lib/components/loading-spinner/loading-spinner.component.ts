import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-loading-spinner',
  standalone: true,
  template: `
    <div class="d-flex align-items-center gap-2" role="status" aria-live="polite">
      <div class="spinner-border spinner-border-sm text-primary" aria-hidden="true"></div>
      <span>{{ label }}</span>
    </div>
  `
})
export class LoadingSpinnerComponent {
  @Input() label = 'Loading...';
}
