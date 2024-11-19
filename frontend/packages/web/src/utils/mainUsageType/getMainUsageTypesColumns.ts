import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { MainUsageTypeFragment } from '../../gql/RealGimm.Web.EstateMainUsageType.fragment';

export const getMainUsageTypesColumns = (): TableColumn<MainUsageTypeFragment>[] => [
  {
    id: 'ordering',
    label: 'main_usage_type.field.ordering',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'internalCode',
    label: 'main_usage_type.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'main_usage_type.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
];
