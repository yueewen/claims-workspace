import { Component } from '@angular/core';

@Component({
  selector: 'app-my-claims',
  standalone: true,
  template: `
    <h1 class="h3 mb-3">My Claims</h1>
    <p class="text-muted">Your submitted claims and their status will appear here.</p>
  `
})
export class MyClaims {}
