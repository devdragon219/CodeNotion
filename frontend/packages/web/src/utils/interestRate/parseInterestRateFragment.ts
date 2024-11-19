import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { InterestRateFragment } from '../../gql/RealGimm.Web.InterestRate.fragment';
import { InterestRateFormInput } from '../../interfaces/FormInputs/InterestRate';

export const parseInterestRateToInterestRateFormInput = (
  interestRate: InterestRateFragment,
): InterestRateFormInput => ({
  interestRateId: interestRate.id,
  since: parseStringToDate(interestRate.since),
  until: parseStringToDate(interestRate.until),
  rate: interestRate.rate,
});
