import { EstateUsageTypeInput } from '@realgimm5/frontend-common/gql/types';

import { UsageTypeApplicability } from '../../enums/UsageTypeApplicability';
import { UsageTypeFormInput } from '../../interfaces/FormInputs/UsageType';

export const parseUsageTypeFormInputToUsageTypeInput = (usageType: UsageTypeFormInput): EstateUsageTypeInput => ({
  name: usageType.name,
  internalCode: usageType.internalCode,
  ordering: usageType.ordering,
  isForContracts: usageType.applicability.includes(UsageTypeApplicability.Contract),
  isForEstate: usageType.applicability.includes(UsageTypeApplicability.Estate),
  isForEstateUnit: usageType.applicability.includes(UsageTypeApplicability.EstateUnit),
  isForEstateSubUnit: usageType.applicability.includes(UsageTypeApplicability.EstateSubUnit),
});
