import { Control, UseFormSetValue } from 'react-hook-form';

import { ContractFormInput } from '../../../../../../interfaces/FormInputs/Contract';

export interface ContractEstateUnitsProps {
  control: Control<ContractFormInput>;
  excludeEstateUnitIds?: number[];
  setValue: UseFormSetValue<ContractFormInput>;
}
