import { FieldErrors } from 'react-hook-form';

import { AdministrationTermInstallmentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermInstallment';

export interface AdministrationTermInstallmentFieldProps {
  errors?: FieldErrors<AdministrationTermInstallmentFormInput>;
  readonly?: boolean;
  value: AdministrationTermInstallmentFormInput;
  onChange: (value: AdministrationTermInstallmentFormInput) => void;
}
