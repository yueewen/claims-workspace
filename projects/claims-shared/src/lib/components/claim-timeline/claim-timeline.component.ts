import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface ClaimTimelineEvent {
  label: string;
  occurredAtUtc: string;
}

@Component({
  selector: 'lib-claim-timeline',
  standalone: true,
  imports: [DatePipe],
  template: `
    <ol class="list-group list-group-numbered">
      @for (event of events; track event.label + event.occurredAtUtc) {
        <li class="list-group-item d-flex justify-content-between align-items-start">
          <span>{{ event.label }}</span>
          <small class="text-muted">{{ event.occurredAtUtc | date: 'medium' }}</small>
        </li>
      }
    </ol>
  `
})
export class ClaimTimelineComponent {
  @Input() events: ClaimTimelineEvent[] = [];
}
