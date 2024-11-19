import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ContractCounterpartsTableProps {
  control: Control<ContractFormInput>;
  errors: FieldErrors<ContractFormInput>;
  isContractActive: boolean;
  mode: FormMode;
  readonly?: boolean;
  readonlyFields?: {
    field: string;
    untilIndex: number;
  }[];
}
