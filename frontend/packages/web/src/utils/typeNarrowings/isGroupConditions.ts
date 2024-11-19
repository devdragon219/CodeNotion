import { isOfType } from '@realgimm5/frontend-common/utils';

import { ConditionFormInput, GroupConditionsFormInput } from '../../interfaces/FormInputs/ConditionsBuilder';

export const isGroupConditionsFormInput = (
  condition: ConditionFormInput | GroupConditionsFormInput,
): condition is GroupConditionsFormInput => isOfType<GroupConditionsFormInput>(condition, ['conditions']);
