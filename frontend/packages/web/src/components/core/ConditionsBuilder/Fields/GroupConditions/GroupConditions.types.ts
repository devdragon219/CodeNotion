import { FieldErrors } from 'react-hook-form';

import { ConditionType } from '../../../../../enums/ConditionType';
import { GroupConditionsFormInput } from '../../../../../interfaces/FormInputs/ConditionsBuilder';

export interface GroupConditionsFieldProps {
  conditionTypes: ConditionType[];
  disabled?: boolean;
  errors?: FieldErrors<GroupConditionsFormInput>;
  groupConditions: GroupConditionsFormInput;
  inner?: boolean;
  readonly?: boolean;
  onChange: (value: GroupConditionsFormInput) => void;
}
