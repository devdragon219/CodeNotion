import { PriceListSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getPriceListsSortInput = (
  columnId: string,
  sortType: SortEnumType,
): PriceListSortInput | PriceListSortInput[] => {
  switch (columnId) {
    case 'ordering':
      return [
        {
          ordering: sortType,
        },
        {
          name: sortType,
        },
      ];
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
