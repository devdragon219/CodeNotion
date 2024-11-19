import { Control, FieldErrors } from 'react-hook-form';

import { ContractFormInput } from '../../../../../../interfaces/FormInputs/Contract';

export interface RegistrationOfficeFieldProps {
  control: Control<ContractFormInput>;
  errors: FieldErrors<ContractFormInput>;
  readonly?: boolean;
}
