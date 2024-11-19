import { PriceListMeasurementUnitSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getPriceListMeasurementUnitsSortInput = (
  columnId: string,
  sortType: SortEnumType,
): PriceListMeasurementUnitSortInput | PriceListMeasurementUnitSortInput[] => {
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
