import { ConditionsBuilderFormInput } from './ConditionsBuilder';

export interface PenaltyFormInput {
  conditions: ConditionsBuilderFormInput;
  description: string;
  guid: string;
  internalCode: string;
  penaltyId: number | null;
}

export interface PenaltiesFieldValues {
  penalties: PenaltyFormInput[];
}
