import { Month } from '@realgimm5/frontend-common/enums';
import { RevaluationDataFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter, parseMonthToMonthIndex } from '@realgimm5/frontend-common/utils';

import { RevaluationDataFragment } from '../../gql/RealGimm.Web.RevaluationData.fragment';

export const getRevaluationDataFilterInput = (
  { id: columnId }: TableColumn<RevaluationDataFragment>,
  value: unknown,
): RevaluationDataFilterInput => {
  switch (columnId) {
    case 'year':
    case 'baseYear':
    case 'revaluationIndex':
      return getTableRangeFilter(columnId, value);
    case 'month':
      return {
        month: {
          in: (value as Month[]).map(parseMonthToMonthIndex),
        },
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
