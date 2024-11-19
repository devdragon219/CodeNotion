import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { QualificationLevelFragment } from '../../gql/RealGimm.Web.QualificationLevel.fragment';

export const getQualificationLevelsColumns = (): TableColumn<QualificationLevelFragment>[] => [
  {
    id: 'ordering',
    label: 'qualification_level.field.ordering',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'internalCode',
    label: 'qualification_level.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'qualification_level.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
];
