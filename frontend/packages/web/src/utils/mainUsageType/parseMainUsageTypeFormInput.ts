import { EstateMainUsageTypeInput } from '@realgimm5/frontend-common/gql/types';

import { MainUsageTypeFormInput } from '../../interfaces/FormInputs/MainUsageType';

export const parseMainUsageTypeFormInputToMainUsageTypeInput = (
  mainUsageType: MainUsageTypeFormInput,
): EstateMainUsageTypeInput => ({
  name: mainUsageType.name,
  internalCode: mainUsageType.internalCode,
  ordering: mainUsageType.ordering,
});
