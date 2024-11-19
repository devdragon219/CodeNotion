import { differenceInDays } from 'date-fns';
import { ParseKeys, TFunction } from 'i18next';

import { NotificationFragment } from '../../gql/RealGimm.Web.Notification.fragment';

const getNotificationType = (notification: NotificationFragment) =>
  notification.__typename
    .split(/(?=[A-Z])/)
    .join('_')
    .toUpperCase();

export const getNotificationTitle = (notification: NotificationFragment, t: TFunction) =>
  t(`core.enum.notification_title.${getNotificationType(notification)}` as ParseKeys);

export const getNotificationBody = (notification: NotificationFragment, t: TFunction) => {
  const key = `core.enum.notification_body.${getNotificationType(notification)}` as ParseKeys;

  switch (notification.__typename) {
    case 'ContractsExpirationNotification':
      return t(key, {
        amount: notification.contractIds.length,
        daysToExpiration: notification.daysToExpiration,
      });
    case 'CostChargesExpirationNotification':
      return t(key, {
        amount: notification.costChargeIds.length,
        daysToExpiration: notification.daysToExpiration,
      });
    case 'PasswordExpirationNotification':
      return t(key, {
        daysToExpiration: differenceInDays(notification.passwordExpirationDate, new Date()),
      });
    default:
      return t(key);
  }
};
