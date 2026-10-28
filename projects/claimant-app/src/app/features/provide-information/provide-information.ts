import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-provide-information',
  standalone: true,
  template: `
    <h1 class="h3 mb-3">Provide Additional Information</h1>
    <p class="text-muted">The information request form for claim {{ claimId }} will appear here.</p>
  `
})
export class ProvideInformation {
  private readonly route = inject(ActivatedRoute);
  protected readonly claimId = this.route.snapshot.paramMap.get('id');
}
