import { PropsWithChildren } from 'react';
import { OperationResult, UseQueryExecute } from 'urql';

import {
  MarkNotificationsAsReadMutation,
  MarkNotificationsAsViewMutation,
} from '../../gql/RealGimm.WebCommon.Notification.operation';
import { NotificationItem } from '../../interfaces/NotificationItem';

export interface NotificationContextProps {
  fetching: boolean;
  notifications: NotificationItem[];
  markNotificationsAsRead: (
    notifications?: NotificationItem | NotificationItem[],
  ) => Promise<OperationResult<MarkNotificationsAsReadMutation>>;
  markNotificationsAsView: () => Promise<OperationResult<MarkNotificationsAsViewMutation>>;
  openNotification: (notification: NotificationItem) => void;
  updateNotifications: UseQueryExecute;
}

export type NotificationProviderProps = PropsWithChildren<{
  fetching: boolean;
  notifications: NotificationItem[];
  navigate: (to: string) => void;
  updateNotifications: UseQueryExecute;
}>;
