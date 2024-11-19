import { getFirstDateOfYear } from '@realgimm5/frontend-common/utils';

import { InterestRateFormInput } from '../../interfaces/FormInputs/InterestRate';

export const getEmptyInterestRateFormInput = (): InterestRateFormInput => ({
  interestRateId: null,
  since: getFirstDateOfYear(),
  until: null,
  rate: null,
});
