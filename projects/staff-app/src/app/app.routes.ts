import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { Login } from './core/auth/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { StaffLayout } from './layouts/staff-layout/staff-layout';
import { Dashboard } from './features/dashboard/dashboard';
import { ClaimsQueue } from './features/claims-queue/claims-queue';
import { MyClaims } from './features/my-claims/my-claims';
import { ClaimDetails } from './features/claim-details/claim-details';
import { TeamOverview } from './features/team-overview/team-overview';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    children: [{ path: '', component: Login }]
  },
  {
    path: '',
    component: StaffLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'claims-queue', component: ClaimsQueue },
      { path: 'my-claims', component: MyClaims },
      { path: 'claim-details/:id', component: ClaimDetails },
      { path: 'team-overview', component: TeamOverview },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
