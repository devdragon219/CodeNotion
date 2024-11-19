import { CostChargeSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getCostChargesSortInput = (
  columnId: string,
  sortType: SortEnumType,
): CostChargeSortInput | CostChargeSortInput[] => {
  switch (columnId) {
    case 'utilityType':
      return [
        {
          service: {
            utilityType: {
              internalCode: sortType,
            },
          },
        },
        {
          service: {
            utilityType: {
              description: sortType,
            },
          },
        },
      ];
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
