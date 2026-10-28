import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../tokens/api-base-url.token';
import { ClaimStatus } from '../models/claim-status.model';

@Injectable({ providedIn: 'root' })
export class ReferenceDataService {
  constructor(private readonly http: HttpClient, @Inject(API_BASE_URL) private readonly apiBaseUrl: string) {}

  getClaimStatuses(): Observable<ClaimStatus[]> {
    return this.http.get<ClaimStatus[]>(`${this.apiBaseUrl}/reference-data/claim-statuses`);
  }
}
