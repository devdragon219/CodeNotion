import { Control, FieldErrors } from 'react-hook-form';

import { ContractRecurringAdditionFormInput } from '../../../../../interfaces/FormInputs/Contract';

export interface RecurringAdditionFieldProps {
  control: Control<ContractRecurringAdditionFormInput>;
  errors: FieldErrors<ContractRecurringAdditionFormInput>;
}
