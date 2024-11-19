import { FieldErrors } from 'react-hook-form';

import { AdministrationTermInstallmentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermInstallment';
import { AdministrationTermPaymentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermPayment';

export interface AdministrationTermPaymentFieldAccordionProps {
  payments: AdministrationTermPaymentFormInput[];
  index: number;
  errors?: FieldErrors<AdministrationTermPaymentFormInput>;
  value: AdministrationTermPaymentFormInput;
  onChange: (value: AdministrationTermPaymentFormInput) => void;
  installments: AdministrationTermInstallmentFormInput[];
  existingPayments?: AdministrationTermPaymentFormInput[];
}
