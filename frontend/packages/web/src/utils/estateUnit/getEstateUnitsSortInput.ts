import { EstateUnitSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getEstateUnitsSortInput = (
  columnId: string,
  sortType: SortEnumType,
): EstateUnitSortInput | EstateUnitSortInput[] => {
  switch (columnId) {
    case 'address.toponymy':
      return [
        {
          address: {
            toponymy: sortType,
          },
        },
        {
          address: {
            numbering: sortType,
          },
        },
      ];
    case 'usageType':
      return {
        usageType: {
          name: sortType,
        },
      };
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
