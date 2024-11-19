import { TermType } from '@realgimm5/frontend-common/gql/types';

import { AdministrationFormInput } from './Administration';
import { AdministrationTermInstallmentFormInput } from './AdministrationTermInstallment';
import { AdministrationTermPaymentFormInput } from './AdministrationTermPayment';

export interface AdministrationTermFormInput {
  administration: AdministrationFormInput;
  administrationTermId: number | null;
  expectedAmount: number | null;
  installments: AdministrationTermInstallmentFormInput[];
  payments: AdministrationTermPaymentFormInput[];
  name: string;
  since: Date | null;
  termType: TermType | null;
  until: Date | null;
}
