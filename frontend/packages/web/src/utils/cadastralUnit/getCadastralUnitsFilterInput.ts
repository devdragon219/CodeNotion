import { CadastralUnitFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { CadastralUnitFragment } from '../../gql/RealGimm.Web.CadastralUnit.fragment';

export const getCadastralUnitsFilterInput = (
  { id: columnId }: TableColumn<CadastralUnitFragment>,
  value: unknown,
): CadastralUnitFilterInput => {
  switch (columnId) {
    case 'type':
    case 'status':
      return createObjectFromKey(columnId, {
        in: value,
      });
    case 'since':
    case 'until':
      return getTableRangeFilter(columnId, value);
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
    case 'coordinates':
      return {
        coordinates: {
          some: {
            or: ['level1', 'level2', 'level3', 'level4', 'unmanagedOverride'].map((key) => ({
              [key]: {
                contains: value,
              },
            })),
          },
        },
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
