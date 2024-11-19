import { Control } from 'react-hook-form';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractOneshotAdditionsProps {
  control: Control<ContractFormInput>;
  readonly?: boolean;
}
