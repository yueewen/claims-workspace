import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-confirmation-dialog',
  standalone: true,
  template: `
    @if (open) {
      <div class="modal d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}</h5>
            </div>
            <div class="modal-body">
              <p>{{ message }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="cancelled.emit()">{{ cancelLabel }}</button>
              <button type="button" class="btn btn-primary" (click)="confirmed.emit()">{{ confirmLabel }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show"></div>
    }
  `
})
export class ConfirmationDialogComponent {
  @Input() open = false;
  @Input() title = 'Please confirm';
  @Input() message = 'Are you sure?';
  @Input() confirmLabel = 'Confirm';
  @Input() cancelLabel = 'Cancel';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}
