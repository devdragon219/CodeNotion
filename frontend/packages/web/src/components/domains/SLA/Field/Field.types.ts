import { FieldErrors } from 'react-hook-form';

import { SlaFormInput } from '../../../../interfaces/FormInputs/SLA';

export interface SlaFieldProps {
  errors?: FieldErrors<SlaFormInput>;
  readonly?: boolean;
  value: SlaFormInput;
  onChange: (value: SlaFormInput) => void;
}
