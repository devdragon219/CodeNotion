import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { InterventionTypeFragment } from '../../gql/RealGimm.Web.InterventionType.fragment';

export const getInterventionTypesColumns = (): TableColumn<InterventionTypeFragment>[] => [
  {
    id: 'internalCode',
    label: 'intervention_type.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'intervention_type.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
];
