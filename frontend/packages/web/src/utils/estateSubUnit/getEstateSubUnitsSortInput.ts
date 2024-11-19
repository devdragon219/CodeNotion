import { EstateSubUnitSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getEstateSubUnitsSortInput = (columnId: string, sortType: SortEnumType): EstateSubUnitSortInput => {
  switch (columnId) {
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
