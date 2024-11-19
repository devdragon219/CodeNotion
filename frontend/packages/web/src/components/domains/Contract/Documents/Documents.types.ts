import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { ContractFormInput } from '../../../../interfaces/FormInputs/Contract';

export interface ContractDocumentsProps {
  control: Control<ContractFormInput>;
  errors: FieldErrors<ContractFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
