import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { getFullName } from '@realgimm5/frontend-common/utils';
import { ReactElement } from 'react';

import { WorkTeamFragment } from '../../gql/RealGimm.Web.WorkTeam.fragment';

export const getWorkTeamsColumns = (
  showAll: (row: WorkTeamFragment) => ReactElement,
): TableColumn<WorkTeamFragment>[] => [
  {
    id: 'internalCode',
    label: 'work_team.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'description',
    label: 'work_team.field.description',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'providerSubjectName',
    label: 'work_team.field.provider_subject',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
    getRowValue: (row) => row.providerSubject.name,
  },
  {
    id: 'leaderUserName',
    label: 'work_team.field.leader_user',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
    getRowValue: (row) => getFullName(row.leaderUser.firstName, row.leaderUser.lastName),
  },
  {
    id: 'workers',
    label: 'work_team.field.workers',
    getRowValue: (row) => {
      if (row.workers.length === 0) {
        return '-';
      }
      return showAll(row);
    },
  },
  {
    id: 'insertionDate',
    label: 'work_team.field.insertion_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
];
