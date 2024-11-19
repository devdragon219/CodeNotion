import { EstateSubUnitFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { EstateSubUnitFragment } from '../../gql/RealGimm.Web.EstateSubUnit.fragment';

export const getEstateSubUnitsFilterInput = (
  { id: columnId }: TableColumn<EstateSubUnitFragment>,
  value: unknown,
): EstateSubUnitFilterInput => {
  switch (columnId) {
    case 'occupantType':
      return createObjectFromKey(columnId, {
        in: value,
      });
    case 'since':
    case 'until':
    case 'surfaceSqM':
    case 'occupancyPercent':
      return getTableRangeFilter(columnId, value);
    case 'usageType':
      return {
        usageType: {
          name: {
            contains: value as string,
          },
        },
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
