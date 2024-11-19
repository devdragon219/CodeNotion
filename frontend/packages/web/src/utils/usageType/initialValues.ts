import { UsageTypeFormInput } from '../../interfaces/FormInputs/UsageType';

export const getEmptyUsageTypeFormInput = (): UsageTypeFormInput => ({
  usageTypeId: null,
  internalCode: '',
  ordering: 0,
  name: '',
  applicability: [],
});
