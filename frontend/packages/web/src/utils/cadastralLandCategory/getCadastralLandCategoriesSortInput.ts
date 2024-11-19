import { CadastralLandCategorySortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getCadastralLandCategoriesSortInput = (
  columnId: string,
  sortType: SortEnumType,
): CadastralLandCategorySortInput | CadastralLandCategorySortInput[] => {
  switch (columnId) {
    case 'ordering':
      return [
        {
          ordering: sortType,
        },
        {
          description: sortType,
        },
      ];
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
