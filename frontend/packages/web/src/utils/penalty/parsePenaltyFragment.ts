import { ConditionType } from '../../enums/ConditionType';
import { PenaltyDetailFragment } from '../../gql/RealGimm.Web.Penalty.fragment';
import { PenaltyFormInput } from '../../interfaces/FormInputs/Penalty';
import { parseConditionsFragmentToGroupConditionsFormInput } from '../components/conditionsBuilder/parseConditionsFragment';

export const parsePenaltyToPenaltyFormInput = (penalty: PenaltyDetailFragment): PenaltyFormInput => ({
  conditions: {
    ifCondition: parseConditionsFragmentToGroupConditionsFormInput(penalty.flatIfConditions, penalty.ifCondition.id),
    thenCondition: {
      conditions: penalty.thenPenalties.map((condition) => ({
        conditionId: condition.id,
        conditionType: ConditionType.PenaltyType,
        operator: null,
        penaltyType: condition.type,
        penaltyValue: condition.amount,
        ticketTypeValue: null,
      })),
      groupConditionId: null,
      operator: penalty.thenOperator,
    },
  },
  description: penalty.description,
  guid: crypto.randomUUID(),
  internalCode: penalty.internalCode,
  penaltyId: penalty.id,
});
