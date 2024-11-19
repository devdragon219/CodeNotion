import { UtilityTypeFormInput } from '../../interfaces/FormInputs/UtilityType';

export const getEmptyUtilityTypeFormInput = (): UtilityTypeFormInput => ({
  category: null,
  description: '',
  expenseClass: '',
  externalCode: '',
  fields: [],
  hasHeatingAccountingSystem: false,
  internalCode: '',
  measurementUnit: '',
  measurementUnitDescription: '',
  meteringType: null,
  timeOfUseRateCount: null,
  utilityTypeId: null,
});
