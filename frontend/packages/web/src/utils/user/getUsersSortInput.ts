import { SortEnumType, UserSortInput } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getUsersSortInput = (columnId: string, sortType: SortEnumType): UserSortInput | UserSortInput[] => {
  switch (columnId) {
    case 'fullName':
      return [
        {
          lastName: sortType,
        },
        {
          firstName: sortType,
        },
      ];
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
