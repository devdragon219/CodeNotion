import { Control, UseFormSetValue } from 'react-hook-form';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ContractLocatedUnitsTransferListProps {
  control: Control<ContractFormInput>;
  excludeIds?: number[];
  isContractActive: boolean;
  setValue: UseFormSetValue<ContractFormInput>;
}
