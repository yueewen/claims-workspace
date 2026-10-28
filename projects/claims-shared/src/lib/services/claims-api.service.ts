import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Claim } from '../models/claim.model';
import { API_BASE_URL } from '../tokens/api-base-url.token';

@Injectable({ providedIn: 'root' })
export class ClaimsApiService {
  constructor(private readonly http: HttpClient, @Inject(API_BASE_URL) private readonly apiBaseUrl: string) {}

  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiBaseUrl}/claims`);
  }

  getClaim(id: string): Observable<Claim> {
    return this.http.get<Claim>(`${this.apiBaseUrl}/claims/${id}`);
  }
}
