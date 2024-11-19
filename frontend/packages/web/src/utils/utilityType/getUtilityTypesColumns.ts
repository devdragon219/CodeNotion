import { MeteringType, UtilityCategory } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { UtilityTypeFragment } from '../../gql/RealGimm.Web.UtilityType.fragment';

export const getUtilityTypesColumns = (t: TFunction): TableColumn<UtilityTypeFragment>[] => [
  {
    id: 'category',
    label: 'utility_type.field.utility_category',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(UtilityCategory),
    getOptionLabel: (option) => t(`common.enum.utility_category.${option as UtilityCategory}`),
  },
  {
    id: 'internalCode',
    label: 'utility_type.field.utility_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'description',
    label: 'utility_type.field.utility_description',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'externalCode',
    label: 'utility_type.field.external_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'expenseClass',
    label: 'utility_type.field.expense_class',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'measurementUnit',
    label: 'utility_type.field.measurement_unit_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'measurementUnitDescription',
    label: 'utility_type.field.measurement_unit_description',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'timeOfUseRateCount',
    type: 'number',
    label: 'utility_type.field.time_of_use_rate_count',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'meteringType',
    label: 'utility_type.field.metering_type',
    enableColumnFilter: true,
    options: Object.values(MeteringType),
    getOptionLabel: (option) => t(`common.enum.metering_type.${option as MeteringType}`),
  },
  {
    id: 'hasHeatingAccountingSystem',
    type: 'boolean',
    label: 'utility_type.field.has_heating_accounting_system',
    enableColumnFilter: true,
    enableSorting: true,
  },
];
