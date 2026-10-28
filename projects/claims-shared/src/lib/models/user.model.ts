export type UserRole = 'Claimant' | 'ClaimStaff';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresAtUtc: string;
  role: UserRole;
}

export interface AuthenticatedUser {
  username: string;
  role: UserRole;
  accessToken: string;
  expiresAtUtc: string;
}
