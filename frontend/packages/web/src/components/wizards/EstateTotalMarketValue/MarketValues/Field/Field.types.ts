import { Control, FieldErrors } from 'react-hook-form';

import { EstateTotalMarketValueFormInput } from '../../../../../interfaces/FormInputs/Estate';

export interface MarketValueFieldProps {
  control: Control<EstateTotalMarketValueFormInput>;
  errors: FieldErrors<EstateTotalMarketValueFormInput>;
  index: number;
}
