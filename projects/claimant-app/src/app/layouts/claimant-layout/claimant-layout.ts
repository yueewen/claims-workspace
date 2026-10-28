import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-claimant-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './claimant-layout.html',
  styleUrl: './claimant-layout.scss'
})
export class ClaimantLayout {
  constructor(protected readonly authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
