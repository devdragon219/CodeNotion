import { AdministrationType, PaymentType } from '@realgimm5/frontend-common/gql/types';

import { BankAccountFragment } from '../../gql/RealGimm.Web.BankAccount.fragment';
import { SubjectFieldValue } from '../FieldValues/Subject';

export interface AdministrationFormInput {
  administrationId: number | null;
  administrationType: AdministrationType | null;
  administratorSubject: SubjectFieldValue | null;
  bankAccount: BankAccountFragment | null;
  isPaymentDataIncluded: boolean;
  notes: string;
  hasTerms: boolean;
  estate: {
    id: number;
    internalCode: string;
    name: string;
    mainUsageTypeName: string;
  } | null;
  paymentType: PaymentType | null;
  since: Date | null;
  until: Date | null;
}

export interface AdministrationsFormInput {
  estate: AdministrationFormInput['estate'];
  administrations: AdministrationFormInput[];
}
