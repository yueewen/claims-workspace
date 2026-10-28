export type DecisionOutcome = 'Settlement' | 'Rejection';

export interface Decision {
  claimId: string;
  outcome: DecisionOutcome;
  decidedByUsername: string;
  decidedAtUtc: string;
  reason: string;
}
