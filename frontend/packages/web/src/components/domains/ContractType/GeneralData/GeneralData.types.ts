import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { ContractTypeFormInput } from '../../../../interfaces/FormInputs/ContractType';

export interface ContractTypeGeneralDataProps {
  control: Control<ContractTypeFormInput>;
  errors: FieldErrors<ContractTypeFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
