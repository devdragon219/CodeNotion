import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { PenaltyFragment } from '../../gql/RealGimm.Web.Penalty.fragment';

export const getPenaltiesColumns = (): TableColumn<PenaltyFragment>[] => [
  {
    id: 'internalCode',
    label: 'penalty.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'description',
    label: 'penalty.field.description',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
];
