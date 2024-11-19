import { FieldErrors } from 'react-hook-form';

import { AdministrationTermInstallmentFormInput } from '../../../../../../interfaces/FormInputs/AdministrationTermInstallment';
import { AdministrationTermPaymentFormInput } from '../../../../../../interfaces/FormInputs/AdministrationTermPayment';

export interface AdministrationTermPaymentInstallmentsFieldProps {
  errors?: FieldErrors<AdministrationTermPaymentFormInput>;
  readonly?: boolean;
  value: AdministrationTermPaymentFormInput;
  onChange: (value: string[]) => void;
  installments: AdministrationTermInstallmentFormInput[];
  existingPayments?: AdministrationTermPaymentFormInput[];
}
