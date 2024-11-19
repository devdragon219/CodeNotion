import { FieldErrors } from 'react-hook-form';

import { ConditionType } from '../../../../../enums/ConditionType';
import { ConditionFormInput } from '../../../../../interfaces/FormInputs/ConditionsBuilder';

export interface ConditionFieldProps {
  condition: ConditionFormInput;
  conditionTypes: ConditionType[];
  disabled?: boolean;
  errors?: FieldErrors<ConditionFormInput>;
  readonly?: boolean;
  onChange: (value: ConditionFormInput) => void;
}
