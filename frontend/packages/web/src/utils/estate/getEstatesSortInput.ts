import { EstateSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getEstatesSortInput = (columnId: string, sortType: SortEnumType): EstateSortInput | EstateSortInput[] => {
  switch (columnId) {
    case 'primaryAddress.toponymy':
      return [
        {
          primaryAddress: {
            toponymy: sortType,
          },
        },
        {
          primaryAddress: {
            numbering: sortType,
          },
        },
      ];
    case 'mainUsageType':
    case 'usageType':
      return {
        [columnId]: {
          name: sortType,
        },
      };
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
