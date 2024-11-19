import { Control, UseFormSetValue } from 'react-hook-form';

import { ContractFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface ContractTransactorsTransferListProps {
  control: Control<ContractFormInput>;
  excludeSubjectIds?: number[];
  isContractActive: boolean;
  setValue: UseFormSetValue<ContractFormInput>;
}
