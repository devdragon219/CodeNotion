import { EstateFilterInput, EstateStatus } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { EstateFragment } from '../../gql/RealGimm.Web.Estate.fragment';

export const getEstatesFilterInput = (
  { id: columnId }: TableColumn<EstateFragment>,
  value: unknown,
): EstateFilterInput => {
  switch (columnId) {
    case 'status':
      return {
        status: {
          eq: value as EstateStatus,
        },
      };
    case 'type':
    case 'ownership':
      return createObjectFromKey(columnId, {
        in: value,
      });
    case 'mainUsageType':
    case 'usageType':
      return {
        [columnId]: {
          name: {
            contains: value as string,
          },
        },
      };
    case 'primaryAddress.toponymy':
      return {
        addresses: {
          some: {
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
        },
      };
    case 'primaryAddress.cityName':
      return {
        addresses: {
          some: {
            cityName: {
              contains: value as string,
            },
          },
        },
      };
    case 'primaryAddress.localPostCode':
      return {
        addresses: {
          some: {
            localPostCode: {
              contains: value as string,
            },
          },
        },
      };
    case 'primaryAddress.countryISO':
      return {
        addresses: {
          some: {
            countryISO: {
              or: (value as string[]).map((value) => ({
                eq: value,
              })),
            },
          },
        },
      };
    case 'surfaceAreaSqM':
    case 'buildYear':
      return getTableRangeFilter(columnId, value);
    case 'primaryAddress.countyName':
      return {
        addresses: {
          some: {
            countyName: {
              contains: value as string,
            },
          },
        },
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
