import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useMarkNotificationsAsReadMutation,
  useMarkNotificationsAsViewMutation,
} from '../../gql/RealGimm.WebCommon.Notification.operation';
import { useNotificationsSubscription } from '../../gql/RealGimm.WebCommon.NotifyUser.operation';
import { NotificationItem } from '../../interfaces/NotificationItem';
import { downloadFile } from '../../utils/fileUtils';
import { useSnackbar } from '../snackbar/hook';
import { NotificationContext } from './context';
import { NotificationContextProps, NotificationProviderProps } from './types';

export const NotificationProvider = ({
  children,
  fetching,
  notifications,
  navigate,
  updateNotifications,
}: NotificationProviderProps) => {
  const [response] = useNotificationsSubscription();
  const [, markNotificationsAsViewMutation] = useMarkNotificationsAsViewMutation();
  const [, markNotificationsAsReadMutation] = useMarkNotificationsAsReadMutation();
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    const notification = response.data?.notifyUser;
    if (notification) {
      updateNotifications();
      showSnackbar(t('common.component.header.notification.new_notification'), { severity: 'info' });
    }
    // eslint-disable-next-line
  }, [response]);

  const markNotificationsAsRead = useCallback(
    async (notifications?: NotificationItem | NotificationItem[]) => {
      const result = await markNotificationsAsReadMutation(
        notifications
          ? {
              ids: Array.isArray(notifications) ? notifications.map(({ id }) => id) : notifications.id,
            }
          : {},
      );
      if (result.data?.notification.markAsRead.isSuccess) {
        updateNotifications();
      }
      return result;
    },
    [markNotificationsAsReadMutation, updateNotifications],
  );

  const markNotificationsAsView = useCallback(async () => {
    const result = await markNotificationsAsViewMutation({});
    if (result.data?.notification.markNewAsUnread.isSuccess) {
      updateNotifications();
    }
    return result;
  }, [markNotificationsAsViewMutation, updateNotifications]);

  const openNotification = useCallback(
    (notification: NotificationItem) => {
      void markNotificationsAsRead(notification);

      if (notification.url) {
        navigate(notification.url);
      } else if (notification.downloadUrl) {
        downloadFile(notification.downloadUrl);
      }
    },
    [markNotificationsAsRead, navigate],
  );

  const contextValue: NotificationContextProps = {
    fetching,
    notifications,
    markNotificationsAsRead,
    markNotificationsAsView,
    openNotification,
    updateNotifications,
  };

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};
