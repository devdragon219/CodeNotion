import { Control, FieldErrors } from 'react-hook-form';

import { RegistrationPaymentFormInput } from '../../../../../interfaces/FormInputs/RegistrationPayment';

export interface RegistrationPaymentRowFieldProps {
  control: Control<RegistrationPaymentFormInput>;
  errors: FieldErrors<RegistrationPaymentFormInput>;
  index: number;
}
