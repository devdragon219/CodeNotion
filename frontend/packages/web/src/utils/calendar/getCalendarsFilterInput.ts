import { CalendarFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

import { CalendarFragment } from '../../gql/RealGimm.Web.Calendar.fragment';

export const getCalendarsFilterInput = (
  { id: columnId }: TableColumn<CalendarFragment>,
  value: unknown,
): CalendarFilterInput => {
  switch (columnId) {
    case 'timeZoneId':
      return {
        timeZoneId: {
          or: (value as string[]).map((value) => ({
            contains: value,
          })),
        },
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
