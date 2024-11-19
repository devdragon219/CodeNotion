import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { AuditLogFragment } from '../../gql/RealGimm.Web.AuditLog.fragment';

export const getAuditEventsColumns = (): TableColumn<AuditLogFragment>[] => [
  {
    id: 'entityType',
    label: 'audit_event.field.type',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'tablePk',
    label: 'audit_event.field.table_pk',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'auditUser',
    label: 'audit_event.field.user',
    enableSorting: true,
  },
  {
    id: 'action',
    label: 'audit_event.field.action',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'auditDate',
    label: 'audit_event.field.date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
];
