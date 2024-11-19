import {
  BusinessCenterTwoTone,
  DomainTwoTone,
  EnergySavingsLeafTwoTone,
  PeopleAltTwoTone,
  PersonTwoTone,
} from '@mui/icons-material';
import { NotificationItem } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';
import { ReactElement } from 'react';

import { NotificationFragment } from '../../gql/RealGimm.Web.Notification.fragment';
import { getNotificationBody, getNotificationTitle } from './getNotificationContent';

export const parseNotificationFragmentToNotificationItem = (
  notification: NotificationFragment,
  t: TFunction,
): NotificationItem => {
  const getIcon = (): ReactElement => {
    switch (notification.__typename) {
      case 'CatalogueItemDocumentExpiredNotification':
      case 'EstateDocumentExpiredNotification':
      case 'EstatePortfolioExportIsReadyNotification':
      case 'EstateUnitDocumentExpiredNotification':
        return <DomainTwoTone />;
      case 'ContractDocumentExpiredNotification':
      case 'ContractsExpirationNotification':
        return <BusinessCenterTwoTone />;
      case 'CostChargesExpirationNotification':
        return <EnergySavingsLeafTwoTone />;
      case 'PasswordExpirationNotification':
        return <PersonTwoTone />;
      case 'SubjectDocumentExpiredNotification':
        return <PeopleAltTwoTone />;
    }
  };

  const getUrl = () => {
    switch (notification.__typename) {
      case 'CatalogueItemDocumentExpiredNotification':
        return `/app/real-estate/catalogues/${notification.estateId}/${notification.catalogueTypeId}/items/${notification.entityId}#1`;

      case 'ContractDocumentExpiredNotification':
        return `/app/asset-management/contracts/${notification.isContractActive ? 'active' : 'passive'}/${notification.entityId}#${!notification.isContractActive || notification.isContractSublocated ? '12' : '11'}`;

      case 'ContractsExpirationNotification':
        return `/app/asset-management/contracts/${notification.isActiveContracts ? 'active' : 'passive'}`;
      case 'CostChargesExpirationNotification':
        return '/app/energy-management/cost-charges';
      case 'EstateDocumentExpiredNotification':
        return `/app/real-estate/estates/${notification.entityId}#8`;
      case 'EstateUnitDocumentExpiredNotification':
        return `/app/real-estate/estate-units/${notification.entityId}#7`;
      case 'PasswordExpirationNotification':
        return `/app/profile#1`;
      case 'SubjectDocumentExpiredNotification':
        return `/app/registry/subjects/${notification.entityId}#4`;
      default:
        return undefined;
    }
  };

  const getDownloadUrl = () => {
    if (notification.__typename !== 'EstatePortfolioExportIsReadyNotification') return undefined;
    return `/api/v1/files/${notification.downloadGuid}`;
  };

  return {
    description: getNotificationBody(notification, t),
    downloadUrl: getDownloadUrl(),
    icon: getIcon(),
    id: notification.id,
    status: notification.status,
    timestamp: notification.timestamp,
    title: getNotificationTitle(notification, t),
    url: getUrl(),
    username: notification.username,
  };
};
