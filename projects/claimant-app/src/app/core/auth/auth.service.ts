import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, computed, signal } from '@angular/core';
import { API_BASE_URL, AuthenticatedUser, LoginRequest, LoginResponse } from 'claims-shared';
import { Observable, map } from 'rxjs';

const STORAGE_KEY = 'claimant.auth';
const EXPECTED_ROLE = 'Claimant';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSignal = signal<AuthenticatedUser | null>(this.readStoredUser());
  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  constructor(private readonly http: HttpClient, @Inject(API_BASE_URL) private readonly apiBaseUrl: string) {}

  login(username: string, password: string): Observable<AuthenticatedUser> {
    const request: LoginRequest = { username, password };
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}/auth/login`, request).pipe(
      map((response) => {
        if (response.role !== EXPECTED_ROLE) {
          throw new Error('This portal is only available to claimants.');
        }
        const user: AuthenticatedUser = {
          username,
          role: response.role,
          accessToken: response.accessToken,
          expiresAtUtc: response.expiresAtUtc
        };
        this.setSession(user);
        return user;
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    this.currentUserSignal.set(null);
  }

  getToken(): string | null {
    return this.currentUserSignal()?.accessToken ?? null;
  }

  private setSession(user: AuthenticatedUser): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.currentUserSignal.set(user);
  }

  private readStoredUser(): AuthenticatedUser | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as AuthenticatedUser;
    } catch {
      return null;
    }
  }
}
