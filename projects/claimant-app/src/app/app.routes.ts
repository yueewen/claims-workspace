import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { Login } from './core/auth/login/login';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { ClaimantLayout } from './layouts/claimant-layout/claimant-layout';
import { MyClaims } from './features/my-claims/my-claims';
import { SubmitClaim } from './features/submit-claim/submit-claim';
import { ClaimDetails } from './features/claim-details/claim-details';
import { ProvideInformation } from './features/provide-information/provide-information';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    children: [{ path: '', component: Login }]
  },
  {
    path: '',
    component: ClaimantLayout,
    canActivate: [authGuard],
    children: [
      { path: 'my-claims', component: MyClaims },
      { path: 'submit-claim', component: SubmitClaim },
      { path: 'claim-details/:id', component: ClaimDetails },
      { path: 'provide-information/:id', component: ProvideInformation },
      { path: '', redirectTo: 'my-claims', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
