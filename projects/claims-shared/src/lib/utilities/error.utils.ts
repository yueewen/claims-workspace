import { HttpErrorResponse } from '@angular/common/http';

export function extractErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (error instanceof HttpErrorResponse) {
    if (typeof error.error === 'string' && error.error.trim().length > 0) {
      return error.error;
    }
    if (error.error?.message) {
      return error.error.message as string;
    }
    if (error.status === 0) {
      return 'Unable to reach the server. Please check your connection.';
    }
  }
  return fallback;
}
