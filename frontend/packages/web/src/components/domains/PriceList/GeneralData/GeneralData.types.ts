import { Control, FieldErrors } from 'react-hook-form';

import { PriceListFormInput } from '../../../../interfaces/FormInputs/PriceList';

export interface PriceListGeneralDataProps {
  control: Control<PriceListFormInput>;
  errors: FieldErrors<PriceListFormInput>;
  readonly?: boolean;
}
