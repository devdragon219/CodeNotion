import { QualificationLevelSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getQualificationLevelsSortInput = (
  columnId: string,
  sortType: SortEnumType,
): QualificationLevelSortInput | QualificationLevelSortInput[] => {
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
