import { InterestRateInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString } from '@realgimm5/frontend-common/utils';

import { InterestRateFormInput } from '../../interfaces/FormInputs/InterestRate';

export const parseInterestRateFormInputToInterestRateInput = (
  interestRate: InterestRateFormInput,
): InterestRateInput => ({
  since: parseDateToString(interestRate.since)!,
  until: parseDateToString(interestRate.until),
  rate: interestRate.rate!,
});
