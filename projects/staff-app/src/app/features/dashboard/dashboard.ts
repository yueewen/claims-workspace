import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h1 class="h3 mb-3">Dashboard</h1>
    <p class="text-muted">Your team's workload and performance summary will appear here.</p>
  `
})
export class Dashboard {}
