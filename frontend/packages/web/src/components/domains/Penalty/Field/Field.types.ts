import { FieldErrors } from 'react-hook-form';

import { PenaltyFormInput } from '../../../../interfaces/FormInputs/Penalty';

export interface PenaltyFieldProps {
  errors?: FieldErrors<PenaltyFormInput>;
  readonly?: boolean;
  value: PenaltyFormInput;
  onChange: (value: PenaltyFormInput) => void;
}
