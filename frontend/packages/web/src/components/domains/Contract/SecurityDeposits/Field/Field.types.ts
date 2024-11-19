import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface SecurityDepositFieldProps {
  control: Control<ContractFormInput>;
  errors: FieldErrors<ContractFormInput>;
  index: number;
  setValue: UseFormSetValue<ContractFormInput>;
}
