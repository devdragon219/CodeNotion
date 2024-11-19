import { Control, UseFormSetValue } from 'react-hook-form';

import { ContractFormInput } from '../../../../../../interfaces/FormInputs/Contract';

export interface ContractEstateSubUnitsProps {
  control: Control<ContractFormInput>;
  excludeEstateSubUnitIds?: number[];
  setValue: UseFormSetValue<ContractFormInput>;
}
