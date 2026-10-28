import { Component } from '@angular/core';

@Component({
  selector: 'app-claims-queue',
  standalone: true,
  template: `
    <h1 class="h3 mb-3">Claims Queue</h1>
    <p class="text-muted">Incoming claims available to pick up will appear here.</p>
  `
})
export class ClaimsQueue {}
