import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractGeneralDataProps {
  control: Control<ContractFormInput>;
  errors: FieldErrors<ContractFormInput>;
  isContractActive: boolean;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<ContractFormInput>;
  trigger: UseFormTrigger<ContractFormInput>;
}
