import { EntryStatus } from '@realgimm5/frontend-common/gql/types';

import { ContractFormInput } from '../../../interfaces/FormInputs/Contract';

export interface ContractsTableProps {
  contract?: ContractFormInput;
  isActive: boolean;
  readonly?: boolean;
  status?: EntryStatus;
}
