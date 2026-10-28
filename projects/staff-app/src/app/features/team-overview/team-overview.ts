import { Component } from '@angular/core';

@Component({
  selector: 'app-team-overview',
  standalone: true,
  template: `
    <h1 class="h3 mb-3">Team Overview</h1>
    <p class="text-muted">Your team's workload and performance metrics will appear here.</p>
  `
})
export class TeamOverview {}
