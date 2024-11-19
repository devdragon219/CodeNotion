import { CadastralLandCategoryFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { CadastralLandCategoryFragment } from '../../gql/RealGimm.Web.CadastralLandCategory.fragment';

export const getCadastralLandCategoriesFilterInput = (
  { id: columnId }: TableColumn<CadastralLandCategoryFragment>,
  value: unknown,
): CadastralLandCategoryFilterInput => {
  switch (columnId) {
    case 'countryISO':
      return {
        countryISO: {
          or: (value as string[]).map((value) => ({
            eq: value,
          })),
        },
      };
    case 'ordering':
      return getTableRangeFilter(columnId, value);
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
