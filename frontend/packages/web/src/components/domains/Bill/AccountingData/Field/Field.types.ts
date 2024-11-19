import { Control, FieldErrors } from 'react-hook-form';

import { BillFormInput } from '../../../../../interfaces/FormInputs/Bill';

export interface BillRowFieldProps {
  control: Control<BillFormInput>;
  errors: FieldErrors<BillFormInput>;
  index: number;
}
