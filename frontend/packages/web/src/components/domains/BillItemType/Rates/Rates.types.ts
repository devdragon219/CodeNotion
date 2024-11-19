import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { BillItemTypeFormInput } from '../../../../interfaces/FormInputs/BillItemType';

export interface BillItemTypeRatesProps {
  control: Control<BillItemTypeFormInput>;
  errors: FieldErrors<BillItemTypeFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<BillItemTypeFormInput>;
}
