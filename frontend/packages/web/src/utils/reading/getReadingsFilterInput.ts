import { ReadingFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { ReadingFragment } from '../../gql/RealGimm.Web.Reading.fragment';

export const getReadingsFilterInput = (
  { id: columnId }: TableColumn<ReadingFragment>,
  value: unknown,
): ReadingFilterInput => {
  if (columnId.startsWith('values')) {
    return {
      values: {
        some: {
          touRateIndex: {
            eq: Number(columnId.split('_')[1]),
          },
          ...getTableRangeFilter('value', value),
        },
      },
    };
  }

  switch (columnId) {
    case 'isEstimated':
      return {
        isEstimated: {
          eq: value as boolean,
        },
      };
    case 'readingTimestamp':
      return getTableRangeFilter(columnId, value);
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
