import { Control } from 'react-hook-form';

import { BillFormInput } from '../../../../interfaces/FormInputs/Bill';

export interface BillAccountingDataProps {
  control: Control<BillFormInput>;
  readonly?: boolean;
}
