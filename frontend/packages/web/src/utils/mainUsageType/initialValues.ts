import { MainUsageTypeFormInput } from '../../interfaces/FormInputs/MainUsageType';

export const getEmptyMainUsageTypeFormInput = (): MainUsageTypeFormInput => ({
  mainUsageTypeId: null,
  internalCode: '',
  ordering: 0,
  name: '',
});
