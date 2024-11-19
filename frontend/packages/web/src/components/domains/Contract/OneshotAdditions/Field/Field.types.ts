import { Control, FieldErrors } from 'react-hook-form';

import { ContractOneshotAdditionFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface OneshotAdditionFieldProps {
  control: Control<ContractOneshotAdditionFormInput>;
  errors: FieldErrors<ContractOneshotAdditionFormInput>;
}
