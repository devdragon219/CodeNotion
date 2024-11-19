import { ContractFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { ContractFragment } from '../../gql/RealGimm.Web.ContractListOutput.fragment';

export const getContractsFilterInput = (
  { id: columnId }: TableColumn<ContractFragment>,
  value: unknown,
): ContractFilterInput => {
  switch (columnId) {
    case 'typeDescription':
      return {
        type: {
          description: {
            contains: value as string,
          },
        },
      };
    case 'status':
    case 'releaseReason':
      return createObjectFromKey(columnId, {
        in: value,
      });
    case 'isSublocated':
    case 'terminator':
    case 'isOccupiedWithoutRight':
      return createObjectFromKey(columnId, {
        eq: value,
      });
    case 'effectStartDate':
    case 'releaseDate':
    case 'terminationDate':
    case 'daysToExpiration':
      return getTableRangeFilter(columnId, value);
    case 'expirationDate':
      return getTableRangeFilter('secondTermExpirationDate', value);
    case 'locatedUnits':
      return {
        anyLocatedUnitInternalCodeContains: value as string,
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
