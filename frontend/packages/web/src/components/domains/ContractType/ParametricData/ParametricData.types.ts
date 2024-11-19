import { Control, FieldErrors } from 'react-hook-form';

import { ContractTypeFormInput } from '../../../../interfaces/FormInputs/ContractType';

export interface ContractTypeParametricDataProps {
  control: Control<ContractTypeFormInput>;
  errors: FieldErrors<ContractTypeFormInput>;
  readonly?: boolean;
}
