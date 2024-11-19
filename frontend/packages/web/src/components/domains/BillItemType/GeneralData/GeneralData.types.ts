import { Control, FieldErrors } from 'react-hook-form';

import { BillItemTypeFormInput } from '../../../../interfaces/FormInputs/BillItemType';

export interface BillItemTypeGeneralDataProps {
  control: Control<BillItemTypeFormInput>;
  errors: FieldErrors<BillItemTypeFormInput>;
  readonly?: boolean;
}
