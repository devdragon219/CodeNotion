import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { FloorTemplateFragment } from '../../gql/RealGimm.Web.FloorTemplate.fragment';

export const getFloorTemplatesColumns = (): TableColumn<FloorTemplateFragment>[] => [
  {
    id: 'position',
    type: 'number',
    label: 'floor.field.floor_position',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'floor.field.floor_name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
];
