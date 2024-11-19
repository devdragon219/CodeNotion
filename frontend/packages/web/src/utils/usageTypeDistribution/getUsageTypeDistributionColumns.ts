import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { UsageTypeDistributionFragment } from '../../gql/RealGimm.Web.UsageTypeDistribution.fragment';

export const getUsageTypeDistributionColumns = (): TableColumn<UsageTypeDistributionFragment>[] => [
  {
    id: 'usageTypeName',
    label: 'usage_type.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'percentage',
    label: 'core.text.percentage',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
    getRowValue: (row) => `${row.percentage}%`,
  },
];
