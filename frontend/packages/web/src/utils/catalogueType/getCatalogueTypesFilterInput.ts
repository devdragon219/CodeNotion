import { CatalogueTypeFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

import { CatalogueTypeFragment } from '../../gql/RealGimm.Web.CatalogueType.fragment';

export const getCatalogueTypesFilterInput = (
  { id: columnId }: TableColumn<CatalogueTypeFragment>,
  value: unknown,
): CatalogueTypeFilterInput => {
  switch (columnId) {
    case 'category':
    case 'subCategory':
      return createObjectFromKey(`${columnId}.name`, {
        contains: value,
      });
    case 'usageTypes':
      return {
        usageTypes: {
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
