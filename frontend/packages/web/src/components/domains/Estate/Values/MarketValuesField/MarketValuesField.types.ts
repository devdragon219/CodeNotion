import { Control, UseFormSetValue } from 'react-hook-form';

import { EstateFormInput } from '../../../../../interfaces/FormInputs/Estate';

export interface MarketValuesFieldProps {
  control: Control<EstateFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<EstateFormInput>;
}
