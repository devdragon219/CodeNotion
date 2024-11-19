import { ParseKeys } from 'i18next';

import { ContractCounterpartFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ContractCounterpartsTransferListProps {
  counterparts?: ContractCounterpartFormInput[];
  excludeSubjectIds?: number[];
  includeSubjectRelationId?: number;
  isContractActive: boolean;
  since?: Date | null;
  titles: {
    left: ParseKeys;
    right: ParseKeys;
  };
  value: ContractCounterpartFormInput[];
  onAdd?: {
    label: ParseKeys;
    onClick: (onComplete: () => void) => void;
  };
  onChange: (value: ContractCounterpartFormInput[]) => void;
}
