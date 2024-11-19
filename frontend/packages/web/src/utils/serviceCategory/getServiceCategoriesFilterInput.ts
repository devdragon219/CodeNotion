import { ServiceCategoryFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

import { ServiceCategoryFragment } from '../../gql/RealGimm.Web.ServiceCategory.fragment';

export const getServiceCategoriesFilterInput = (
  { id: columnId }: TableColumn<ServiceCategoryFragment>,
  value: unknown,
): ServiceCategoryFilterInput => {
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
