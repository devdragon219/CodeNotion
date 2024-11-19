import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { SlaFragment } from '../../gql/RealGimm.Web.SLA.fragment';

export const getSlasColumns = (): TableColumn<SlaFragment>[] => [
  {
    id: 'internalCode',
    label: 'sla.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'description',
    label: 'sla.field.description',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
];
