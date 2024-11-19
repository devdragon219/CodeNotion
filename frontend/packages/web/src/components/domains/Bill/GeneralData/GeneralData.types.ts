import { Control, FieldErrors } from 'react-hook-form';

import { BillFormInput } from '../../../../interfaces/FormInputs/Bill';

export interface BillGeneralDataProps {
  control: Control<BillFormInput>;
  errors: FieldErrors<BillFormInput>;
  isBillActive: boolean;
  readonly?: boolean;
}
