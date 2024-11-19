import { UsageTypeApplicability } from '../../enums/UsageTypeApplicability';
import { UsageTypeFragment } from '../../gql/RealGimm.Web.EstateUsageType.fragment';
import { UsageTypeFormInput } from '../../interfaces/FormInputs/UsageType';

export const parseUsageTypeToUsageTypeFormInput = (usageType: UsageTypeFragment): UsageTypeFormInput => ({
  usageTypeId: usageType.id,
  ordering: usageType.ordering,
  internalCode: usageType.internalCode,
  name: usageType.name,
  applicability: [
    usageType.isForEstate ? UsageTypeApplicability.Estate : undefined,
    usageType.isForEstateUnit ? UsageTypeApplicability.EstateUnit : undefined,
    usageType.isForEstateSubUnit ? UsageTypeApplicability.EstateSubUnit : undefined,
    usageType.isForContracts ? UsageTypeApplicability.Contract : undefined,
  ].filter((it) => !!it),
});
