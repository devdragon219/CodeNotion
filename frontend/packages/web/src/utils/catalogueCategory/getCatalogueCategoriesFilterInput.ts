import { CatalogueCategoryFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

import { CatalogueCategoryFragment } from '../../gql/RealGimm.Web.CatalogueCategory.fragment';

export const getCatalogueCategoriesFilterInput = (
  { id: columnId }: TableColumn<CatalogueCategoryFragment>,
  value: unknown,
): CatalogueCategoryFilterInput => {
  switch (columnId) {
    case 'subCategories':
      return {
        subCategories: {
          some: {
            name: {
              contains: value as string,
            },
          },
        },
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
