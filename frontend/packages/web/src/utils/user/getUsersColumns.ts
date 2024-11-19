import { OfficeAccess, UserStatus, UserType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { getFullName } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { SORTED_OFFICE_ACCESSES } from '../../configs/user';
import { UserFragment } from '../../gql/RealGimm.Web.User.fragment';

export const getUsersColumns = (t: TFunction): TableColumn<UserFragment>[] => [
  {
    id: 'fullName',
    label: 'user.field.full_name',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    enableSorting: true,
    getRowValue: (row) => getFullName(row.firstName, row.lastName),
  },
  {
    id: 'userName',
    label: 'user.field.user_name',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'status',
    label: 'user.field.status',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(UserStatus),
    getOptionLabel: (option) => t(`common.enum.user_status.${option as UserStatus}`),
  },
  {
    id: 'managementSubjectName',
    label: 'user.field.management_subjects',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    getRowValue: (row) =>
      row.managementSubjects
        .map((subject) => subject.name)
        .filter((it) => it.length !== 0)
        .join(', '),
  },
  {
    id: 'type',
    label: 'user.field.type',
    enableColumnFilter: true,
    options: Object.values(UserType),
    getOptionLabel: (option) => t(`common.enum.user_type.${option as UserType}`),
  },
  {
    id: 'officeAccess',
    label: 'user.field.office_access',
    enableColumnFilter: true,
    multiple: true,
    useSortedOptions: false,
    options: SORTED_OFFICE_ACCESSES,
    getOptionLabel: (option) => t(`common.enum.office_access.${option as OfficeAccess}`),
  },
  {
    id: 'groupName',
    label: 'user.field.groups',
    enableGlobalFilter: true,
    enableColumnFilter: true,
    getRowValue: (row) => row.groups.map((group) => group.name).join(', '),
  },
];
