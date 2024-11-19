import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractRevaluationProps {
  control: Control<ContractFormInput>;
  errors: FieldErrors<ContractFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<ContractFormInput>;
}
