import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { PriceListMeasurementUnitFragment } from '../../gql/RealGimm.Web.PriceListMeasurementUnit.fragment';

export const getPriceListMeasurementUnitColumns = (): TableColumn<PriceListMeasurementUnitFragment>[] => [
  {
    id: 'ordering',
    label: 'price_list_measurement_unit.field.ordering',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'internalCode',
    label: 'price_list_measurement_unit.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'name',
    label: 'price_list_measurement_unit.field.name',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
];
