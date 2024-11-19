import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { EstateUnitTypeDistributionFragment } from '../../gql/RealGimm.Web.EstateUnitTypeDistribution.fragment';

export const getEstateUnitTypeDistributionColumns = (
  t: TFunction,
): TableColumn<EstateUnitTypeDistributionFragment>[] => [
  {
    id: 'usageTypeName',
    label: 'estate_unit.field.estate_unit_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => t(`common.enum.estate_unit_type.${row.estateUnitType}`),
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
