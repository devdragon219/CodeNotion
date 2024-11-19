import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ContractTypeFieldProps {
  control: Control<ContractFormInput>;
  errors: FieldErrors<ContractFormInput>;
  isContractActive: boolean;
  disabled?: boolean;
  readonly?: boolean;
  setValue: UseFormSetValue<ContractFormInput>;
}
