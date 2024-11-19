import { CatalogueTypeSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getCatalogueTypesSortInput = (columnId: string, sortType: SortEnumType): CatalogueTypeSortInput => {
  switch (columnId) {
    case 'category':
      return {
        category: {
          name: sortType,
        },
      };
    case 'subCategory':
      return {
        subCategory: {
          name: sortType,
        },
      };
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
