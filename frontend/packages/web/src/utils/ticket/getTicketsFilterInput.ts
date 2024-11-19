import { TicketFilterInput, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter, parseDateToString } from '@realgimm5/frontend-common/utils';
import { startOfToday } from 'date-fns';

import { TicketFragment } from '../../gql/RealGimm.Web.Ticket.fragment';

export const getTicketsFilterInput = (
  { id: columnId }: TableColumn<TicketFragment>,
  value: unknown,
): TicketFilterInput => {
  switch (columnId) {
    case 'dueDate':
      return getTableRangeFilter(columnId, value);
    case 'mainType':
    case 'masterStatus':
      return {
        [columnId]: {
          in: value,
        },
      };
    case 'isExcludedFromMaintenanceContract':
      return {
        isExcludedFromMaintenanceContract: {
          eq: value as boolean,
        },
      };
    case 'expired': {
      return value
        ? {
            masterStatus: {
              neq: TicketMasterStatus.Completed,
            },
            dueDate: {
              lt: parseDateToString(startOfToday()),
            },
          }
        : {
            or: [
              {
                masterStatus: {
                  eq: TicketMasterStatus.Completed,
                },
              },
              {
                dueDate: {
                  eq: null,
                },
              },
              {
                dueDate: {
                  gte: parseDateToString(startOfToday()),
                },
              },
            ],
          };
    }
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
