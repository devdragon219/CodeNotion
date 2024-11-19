import { FcltContractTypeSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getFacilityContractTypesSortInput = (
  columnId: string,
  sortType: SortEnumType,
): FcltContractTypeSortInput | FcltContractTypeSortInput[] => {
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
