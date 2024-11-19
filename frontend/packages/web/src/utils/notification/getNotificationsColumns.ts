import { NotificationStatus } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { NotificationFragment } from '../../gql/RealGimm.Web.Notification.fragment';
import { getNotificationBody, getNotificationTitle } from './getNotificationContent';

export const getNotificationsColumns = (t: TFunction): TableColumn<NotificationFragment>[] => [
  {
    id: 'title',
    label: 'notification.field.title',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => getNotificationTitle(row, t),
  },
  {
    id: 'body',
    label: 'notification.field.body',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => getNotificationBody(row, t),
  },
  {
    id: 'timestamp',
    type: 'date',
    label: 'notification.field.timestamp',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'status',
    label: 'notification.field.status',
    multiple: true,
    options: Object.values(NotificationStatus),
    enableColumnFilter: true,
    getOptionLabel: (option) => t(`common.enum.notification_status.${option as NotificationStatus}`),
  },
];
