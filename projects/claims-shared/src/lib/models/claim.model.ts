import { ClaimStatus } from './claim-status.model';

export interface Claim {
  id: string;
  reference: string;
  claimantName: string;
  status: ClaimStatus;
  submittedAtUtc: string;
  description: string;
}
