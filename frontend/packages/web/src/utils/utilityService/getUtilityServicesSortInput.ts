import { SortEnumType, UtilityServiceSortInput } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getUtilityServicesSortInput = (
  columnId: string,
  sortType: SortEnumType,
): UtilityServiceSortInput | UtilityServiceSortInput[] => {
  switch (columnId) {
    case 'utilityType':
      return [
        {
          utilityType: {
            internalCode: sortType,
          },
        },
        {
          utilityType: {
            description: sortType,
          },
        },
      ];
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
