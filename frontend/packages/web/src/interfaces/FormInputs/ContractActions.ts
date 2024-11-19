import { ReleaseReason, TakeoverType } from '@realgimm5/frontend-common/gql/types';

import { ContractVariation } from '../../enums/ContractVariation';
import { CounterpartVariation } from '../../enums/CounterpartVariation';
import { SubjectFieldValue } from '../FieldValues/Subject';
import { ContractCounterpartFormInput } from './Contract';

export interface ContractBillingPauseFormInput {
  isRecoveryArrears: boolean;
  notes: string;
  since: Date | null;
  until: Date | null;
}

export interface ContractReleaseFormInput {
  date: Date | null;
  isOccupiedWithoutRight: boolean;
  reason: ReleaseReason | null;
}

export interface ContractCounterpartVariationTakeoverFormInput {
  counterparts: ContractCounterpartFormInput[];
  originalCounterparts: ContractCounterpartFormInput[];
  takeoverCounterparts: ContractCounterpartFormInput[];
  takeoverDate: Date | null;
  takeoverLegalRepresentativeSubject: SubjectFieldValue | null;
  takeoverType: TakeoverType | null;
}

export interface ContractCounterpartVariationAddFormInput {
  counterparts: ContractCounterpartFormInput[];
  newCounterparts: ContractCounterpartFormInput[];
}

export interface ContractCounterpartVariationTransferFormInput {
  counterparts: ContractCounterpartFormInput[];
  originalCounterparts: ContractCounterpartFormInput[];
  takeoverCounterparts: ContractCounterpartFormInput[];
  takeoverDate: Date | null;
  takeoverLegalRepresentativeSubject: SubjectFieldValue | null;
}

export interface ContractCounterpartVariationDeceaseFormInput {
  counterparts: ContractCounterpartFormInput[];
  originalCounterpart: ContractCounterpartFormInput | null;
  takeoverCounterparts: ContractCounterpartFormInput[];
}

export type ContractCounterpartVariationFormInput =
  | {
      input: ContractCounterpartVariationTakeoverFormInput;
      variation: CounterpartVariation.Takeover;
    }
  | {
      input: ContractCounterpartVariationAddFormInput;
      variation: CounterpartVariation.Add;
    }
  | {
      input: ContractCounterpartVariationTransferFormInput;
      variation: CounterpartVariation.Transfer;
    }
  | {
      input: ContractCounterpartVariationDeceaseFormInput;
      variation: CounterpartVariation.Decease;
    };

export interface ContractVariationTakeoverFormInput {
  counterparts: ContractCounterpartFormInput[];
  paymentDate: Date | null;
  takeoverLegalRepresentativeSubject: SubjectFieldValue | null;
}

export interface ContractVariationTransferFormInput {
  contracts: {
    counterpartName: string;
    effectStartDate: string;
    id: number;
    internalCode: string;
    typeDescription: string;
  }[];
  managementSubject: SubjectFieldValue | null;
  paymentDate: Date | null;
  takeoverDate: Date | null;
  takeoverLegalRepresentativeSubject: SubjectFieldValue | null;
  takeoverType: TakeoverType | null;
}

export type ContractVariationFormInput =
  | {
      input: ContractVariationTakeoverFormInput;
      variation: ContractVariation.Takeover;
    }
  | {
      input: ContractVariationTransferFormInput;
      variation: ContractVariation.Transfer;
    };
