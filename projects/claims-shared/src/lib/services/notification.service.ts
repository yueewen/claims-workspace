import { Injectable, signal } from '@angular/core';

export type NotificationLevel = 'info' | 'success' | 'warning' | 'error';

export interface AppNotification {
  id: number;
  level: NotificationLevel;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly nextId = { value: 0 };
  readonly notifications = signal<AppNotification[]>([]);

  notify(message: string, level: NotificationLevel = 'info'): void {
    const notification: AppNotification = { id: ++this.nextId.value, level, message };
    this.notifications.update((current) => [...current, notification]);
  }

  dismiss(id: number): void {
    this.notifications.update((current) => current.filter((n) => n.id !== id));
  }
}
