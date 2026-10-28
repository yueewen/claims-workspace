import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ClaimStatus } from '../../models/claim-status.model';

const STATUS_STYLES: Record<ClaimStatus, string> = {
  Submitted: 'text-bg-secondary',
  UnderReview: 'text-bg-info',
  AwaitingInformation: 'text-bg-warning',
  Assessed: 'text-bg-primary',
  Settled: 'text-bg-success',
  Rejected: 'text-bg-danger'
};

@Component({
  selector: 'lib-claim-status-badge',
  standalone: true,
  imports: [NgClass],
  template: `<span class="badge" [ngClass]="badgeClass">{{ status }}</span>`
})
export class ClaimStatusBadgeComponent {
  @Input({ required: true }) status!: ClaimStatus;

  get badgeClass(): string {
    return STATUS_STYLES[this.status] ?? 'text-bg-secondary';
  }
}
