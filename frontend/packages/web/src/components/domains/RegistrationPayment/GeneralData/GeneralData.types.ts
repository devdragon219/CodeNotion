import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { RegistrationPaymentFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';

export interface RegistrationPaymentGeneralDataProps {
  control: Control<RegistrationPaymentFormInput>;
  errors: FieldErrors<RegistrationPaymentFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
