import { MainUsageTypeFragment } from '../../gql/RealGimm.Web.EstateMainUsageType.fragment';
import { MainUsageTypeFormInput } from '../../interfaces/FormInputs/MainUsageType';

export const parseMainUsageTypeToMainUsageTypeFormInput = (
  mainUsageType: MainUsageTypeFragment,
): MainUsageTypeFormInput => ({
  mainUsageTypeId: mainUsageType.id,
  ordering: mainUsageType.ordering,
  internalCode: mainUsageType.internalCode,
  name: mainUsageType.name,
});
