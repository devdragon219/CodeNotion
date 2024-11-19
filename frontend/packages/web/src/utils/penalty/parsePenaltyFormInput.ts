import { FormMode } from '@realgimm5/frontend-common/enums';
import { PenaltyInput, PenaltyValueInput } from '@realgimm5/frontend-common/gql/types';

import { ConditionType } from '../../enums/ConditionType';
import { PenaltyFormInput } from '../../interfaces/FormInputs/Penalty';
import { parseGroupConditionsFormInputToConditionsInput } from '../components/conditionsBuilder/parseConditionsFormInput';
import { isGroupConditionsFormInput } from '../typeNarrowings/isGroupConditions';

export const parsePenaltyFormInputToPenaltyInput = (penalty: PenaltyFormInput, mode: FormMode): PenaltyInput => ({
  description: penalty.description,
  id: mode === FormMode.Create ? undefined : penalty.penaltyId,
  ifCondition: parseGroupConditionsFormInputToConditionsInput(penalty.conditions.ifCondition, mode),
  internalCode: penalty.internalCode,
  thenOperator: penalty.conditions.thenCondition.operator,
  thenPenalties: penalty.conditions.thenCondition.conditions.reduce<PenaltyValueInput[]>((acc, condition) => {
    if (isGroupConditionsFormInput(condition) || condition.conditionType !== ConditionType.PenaltyType) {
      return acc;
    }

    return [
      ...acc,
      {
        amount: condition.penaltyValue!,
        id: mode === FormMode.Create ? undefined : condition.conditionId,
        type: condition.penaltyType!,
      },
    ];
  }, []),
});
