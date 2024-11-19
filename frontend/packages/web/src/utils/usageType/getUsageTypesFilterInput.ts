import { EstateUsageTypeFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { UsageTypeApplicability } from '../../enums/UsageTypeApplicability';
import { UsageTypeFragment } from '../../gql/RealGimm.Web.EstateUsageType.fragment';

const getUsageApplicabilityFilter = (value: UsageTypeApplicability): EstateUsageTypeFilterInput => {
  switch (value) {
    case UsageTypeApplicability.Estate:
      return {
        isForEstate: {
          eq: true,
        },
      };
    case UsageTypeApplicability.EstateUnit:
      return {
        isForEstateUnit: {
          eq: true,
        },
      };
    case UsageTypeApplicability.EstateSubUnit:
      return {
        isForEstateSubUnit: {
          eq: true,
        },
      };
    case UsageTypeApplicability.Contract:
      return {
        isForContracts: {
          eq: true,
        },
      };
    default:
      return {};
  }
};

export const getUsageTypesFilterInput = (
  { id: columnId }: TableColumn<UsageTypeFragment>,
  value: unknown,
): EstateUsageTypeFilterInput => {
  switch (columnId) {
    case 'applicability':
      return {
        or: (value as UsageTypeApplicability[]).map(getUsageApplicabilityFilter),
      };
    case 'ordering':
      return getTableRangeFilter(columnId, value);
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
