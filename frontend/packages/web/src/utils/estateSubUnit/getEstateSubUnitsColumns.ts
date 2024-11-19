import { OccupantType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { EstateSubUnitFragment } from '../../gql/RealGimm.Web.EstateSubUnit.fragment';

export const getEstateSubUnitsColumns = (t: TFunction): TableColumn<EstateSubUnitFragment>[] => [
  {
    id: 'internalCode',
    label: 'estate_sub_unit.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'occupantType',
    label: 'estate_sub_unit.field.occupant_type',
    multiple: true,
    options: Object.values(OccupantType),
    enableColumnFilter: true,
    getOptionLabel: (option: unknown) => t(`common.enum.occupant_type.${option as OccupantType}`),
  },
  {
    id: 'occupantSubjectName',
    label: 'estate_sub_unit.field.occupant',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.occupantSubject?.name,
  },
  {
    id: 'orgUnitName',
    label: 'estate_sub_unit.field.org_unit',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.orgUnit?.name,
  },
  {
    id: 'usageType',
    label: 'estate_sub_unit.field.usage_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.usageType?.name,
  },
  {
    id: 'since',
    type: 'date',
    label: 'estate_sub_unit.field.since',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'until',
    type: 'date',
    label: 'estate_sub_unit.field.until',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'surfaceSqM',
    type: 'number',
    label: 'estate_sub_unit.field.surface',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'occupancyPercent',
    type: 'number',
    label: 'estate_sub_unit.field.occupancy_percentage',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'notes',
    label: 'estate_sub_unit.field.notes',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
];
