import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { GroupFragment } from '../../gql/RealGimm.Web.Group.fragment';

export const getGroupsColumns = (): TableColumn<GroupFragment>[] => [
  {
    id: 'name',
    label: 'group.field.name',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'description',
    label: 'group.field.description',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    enableSorting: true,
  },
];
