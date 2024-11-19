import { UtilityTypeInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseFormBuilderRowFormInputsToFieldInputs } from '@realgimm5/frontend-common/utils';

import { UtilityTypeFormInput } from '../../interfaces/FormInputs/UtilityType';

export const parseUtilityTypeFormInputToUtilityTypeInput = (utilityType: UtilityTypeFormInput): UtilityTypeInput => ({
  category: utilityType.category!,
  chargeFields: parseFormBuilderRowFormInputsToFieldInputs(utilityType.fields),
  description: utilityType.description,
  expenseClass: getStringOrNull(utilityType.expenseClass),
  externalCode: getStringOrNull(utilityType.externalCode),
  hasHeatingAccountingSystem: utilityType.hasHeatingAccountingSystem,
  internalCode: utilityType.internalCode,
  measurementUnit: utilityType.measurementUnit,
  measurementUnitDescription: utilityType.measurementUnitDescription,
  meteringType: utilityType.meteringType!,
  timeOfUseRateCount: utilityType.timeOfUseRateCount!,
});
