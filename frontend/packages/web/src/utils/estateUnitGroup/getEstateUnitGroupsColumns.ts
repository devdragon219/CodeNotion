import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { EstateUnitGroupFragment } from '../../gql/RealGimm.Web.EstateUnitGroup.fragment';

export const getEstateUnitGroupsColumns = (
  showAll: (row: EstateUnitGroupFragment) => ReactElement,
): TableColumn<EstateUnitGroupFragment>[] => [
  {
    id: 'internalCode',
    label: 'estate_unit_group.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'estate_unit_group.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'managementSubjectName',
    label: 'estate_unit_group.field.management_subject',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.managementSubject.name,
  },
  {
    id: 'estateUnits',
    label: 'estate_unit_group.field.estate_units',
    getRowValue: (row) => {
      if (row.estateUnits.length === 0) {
        return '-';
      }
      return showAll(row);
    },
  },
];
