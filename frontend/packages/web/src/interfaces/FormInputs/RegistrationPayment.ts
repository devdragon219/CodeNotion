import { RegistrationPaymentType } from '@realgimm5/frontend-common/gql/types';

export interface RegistrationPaymentRowFormInput {
  amountCleared: number | null;
  amountDue: number | null;
  paymentRowCode: string;
  paymentRowReceivingEntity: string;
  paymentRowSection: string;
  referencePeriod: number | null;
  referenceYear: number | null;
  registrationPaymentRowId: number | null;
}

export interface RegistrationPaymentFormInput {
  contract: {
    id: number;
    internalCode: string;
    managementSubjectName: string;
  } | null;
  paymentCode: string;
  paymentType: RegistrationPaymentType | null;
  paymentYear: number | null;
  registrationPaymentId: number | null;
  rows: RegistrationPaymentRowFormInput[];
  sanctionAmount: number | null;
  taxAmount: number | null;
  valueDate: Date | null;
}
