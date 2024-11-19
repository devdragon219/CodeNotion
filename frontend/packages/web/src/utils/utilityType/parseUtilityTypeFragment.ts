import { parseFieldsToFormBuilderRowFormInputs } from '@realgimm5/frontend-common/utils';

import { UtilityTypeDetailFragment } from '../../gql/RealGimm.Web.UtilityType.fragment';
import { UtilityTypeFormInput } from '../../interfaces/FormInputs/UtilityType';

export const parseUtilityTypeToUtilityTypeFormInput = (
  utilityType: UtilityTypeDetailFragment,
): UtilityTypeFormInput => ({
  category: utilityType.category,
  description: utilityType.description,
  expenseClass: utilityType.expenseClass ?? '',
  externalCode: utilityType.externalCode ?? '',
  fields: parseFieldsToFormBuilderRowFormInputs(utilityType.chargeFields ?? []),
  hasHeatingAccountingSystem: utilityType.hasHeatingAccountingSystem,
  internalCode: utilityType.internalCode,
  measurementUnit: utilityType.measurementUnit,
  measurementUnitDescription: utilityType.measurementUnitDescription,
  meteringType: utilityType.meteringType,
  timeOfUseRateCount: utilityType.timeOfUseRateCount,
  utilityTypeId: utilityType.id,
});
