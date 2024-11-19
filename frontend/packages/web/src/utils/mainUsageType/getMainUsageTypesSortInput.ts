import { EstateMainUsageTypeSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getMainUsageTypesSortInput = (
  columnId: string,
  sortType: SortEnumType,
): EstateMainUsageTypeSortInput | EstateMainUsageTypeSortInput[] => {
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
