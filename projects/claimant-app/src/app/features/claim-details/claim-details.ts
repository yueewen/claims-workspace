import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-claim-details',
  standalone: true,
  template: `
    <h1 class="h3 mb-3">Claim Details</h1>
    <p class="text-muted">Details for claim {{ claimId }} will appear here.</p>
  `
})
export class ClaimDetails {
  private readonly route = inject(ActivatedRoute);
  protected readonly claimId = this.route.snapshot.paramMap.get('id');
}
