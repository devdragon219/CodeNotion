import { ConditionType } from '../../enums/ConditionType';
import { PenaltyFormInput } from '../../interfaces/FormInputs/Penalty';
import { getEmptyConditionsBuilderFormInput } from '../components/conditionsBuilder/initialValues';

export const getEmptyPenaltyFormInput = (): PenaltyFormInput => ({
  conditions: getEmptyConditionsBuilderFormInput(null, ConditionType.PenaltyType),
  description: '',
  guid: crypto.randomUUID(),
  internalCode: '',
  penaltyId: null,
});
