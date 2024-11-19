import { WarningAmber } from '@mui/icons-material';
import { TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { differenceInDays, isBefore, startOfToday } from 'date-fns';
import { TFunction } from 'i18next';

import { SORTED_TICKET_MASTER_STATUSES } from '../../configs/ticket';
import { TicketFragment } from '../../gql/RealGimm.Web.Ticket.fragment';

export const getTicketsColumns = (
  t: TFunction,
  options?: { status?: 'expiring' | 'expired'; useMainType?: boolean },
): TableColumn<TicketFragment>[] => [
  {
    id: 'internalCode',
    label: 'ticket.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'dueDate',
    label: 'ticket.field.checklist_due_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'workOrderReference',
    label: 'ticket.field.work_order_reference',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  ...((options?.useMainType
    ? [
        {
          id: 'mainType',
          label: 'ticket.field.main_type',
          options: Object.values(TicketMainType),
          multiple: true,
          useSortedOptions: false,
          getOptionLabel: (option) => t(`common.enum.ticket_main_type.${option as TicketMainType}`),
          enableColumnFilter: true,
        },
      ]
    : []) as TableColumn<TicketFragment>[]),
  {
    id: 'description',
    label: 'ticket.field.description',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'masterStatus',
    label: 'ticket.field.ticket_status',
    options: SORTED_TICKET_MASTER_STATUSES,
    multiple: true,
    useSortedOptions: false,
    getOptionLabel: (option) => t(`common.enum.ticket_master_status.${option as TicketMasterStatus}`),
    enableColumnFilter: true,
  },
  {
    id: 'supplierSubjectName',
    label: 'ticket.field.supplier_subject',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
    getRowValue: (row) => row.supplierSubject.name,
  },
  {
    id: 'requestor',
    label: 'ticket.field.requestor',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'isExcludedFromMaintenanceContract',
    label: 'ticket.field.excluded_from_contract',
    type: 'boolean',
    enableColumnFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  options?.status === 'expired'
    ? {
        id: 'expiredDays',
        label: 'ticket.field.expired_days',
        sticky: 'right',
        getRowValue: (row) => {
          const until = parseStringToDate(row.dueDate);
          return until ? differenceInDays(startOfToday(), until) : null;
        },
      }
    : options?.status === 'expiring'
      ? {
          id: 'expiringDays',
          label: 'ticket.field.expiring_days',
          sticky: 'right',
          getRowValue: (row) => {
            const until = parseStringToDate(row.dueDate);
            return until ? differenceInDays(until, startOfToday()) : null;
          },
        }
      : {
          id: 'expired',
          label: 'ticket.field.expired',
          type: 'boolean',
          sticky: 'right',
          enableColumnFilter: true,
          useRowValue: true,
          getRowValue: (row) => {
            const until = parseStringToDate(row.dueDate);
            return until && isBefore(until, startOfToday()) ? (
              <WarningAmber
                sx={(theme) => ({
                  color: theme.palette.danger[300],
                  width: 24,
                  height: 24,
                })}
              />
            ) : null;
          },
        },
];
