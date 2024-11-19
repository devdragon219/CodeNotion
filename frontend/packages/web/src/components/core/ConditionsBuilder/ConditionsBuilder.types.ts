import { FieldErrors } from 'react-hook-form';

import { ConditionType } from '../../../enums/ConditionType';
import { ConditionsBuilderFormInput } from '../../../interfaces/FormInputs/ConditionsBuilder';

export interface ConditionsBuilderProps {
  conditionTypes: {
    if: ConditionType[];
    then: ConditionType[];
  };
  disabled?: boolean;
  errors?: FieldErrors<ConditionsBuilderFormInput>;
  readonly?: boolean;
  value?: ConditionsBuilderFormInput;
  onChange?: (value: ConditionsBuilderFormInput) => void;
}
