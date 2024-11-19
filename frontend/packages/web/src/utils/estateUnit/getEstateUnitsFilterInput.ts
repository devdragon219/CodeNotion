import { EstateUnitFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';

export const getEstateUnitsFilterInput = (
  { id: columnId }: TableColumn<EstateUnitFragment>,
  value: unknown,
): EstateUnitFilterInput => {
  switch (columnId) {
    case 'type':
    case 'status':
    case 'estate.type':
      return createObjectFromKey(columnId, {
        in: value,
      });
    case 'address.countryISO':
      return {
        address: {
          countryISO: {
            or: (value as string[]).map((value) => ({
              eq: value,
            })),
          },
        },
      };
    case 'address.toponymy':
      return {
        address: {
          or: [
            {
              toponymy: {
                contains: value as string,
              },
            },
            {
              numbering: {
                contains: value as string,
              },
            },
          ],
        },
      };
    case 'netSurface':
    case 'grossSurface':
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
