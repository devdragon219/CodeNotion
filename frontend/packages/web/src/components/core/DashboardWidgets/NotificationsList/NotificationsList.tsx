import { ChevronRight } from '@mui/icons-material';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { DashboardWidgetContainer, NotificationView } from '@realgimm5/frontend-common/components';
import { NotificationStatus } from '@realgimm5/frontend-common/gql/types';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { parseDateToString } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { NotificationFragment } from '../../../../gql/RealGimm.Web.Notification.fragment';
import { useGetNotificationsQuery } from '../../../../gql/RealGimm.Web.Notification.operation';
import { parseNotificationFragmentToNotificationItem } from '../../../../utils/notification/parseNotificationFragment';

const mockData: NotificationFragment[] = [
  {
    __typename: 'CatalogueItemDocumentExpiredNotification',
    estateId: 0,
    catalogueTypeId: 0,
    entityId: 0,
    username: 'username',
    timestamp: parseDateToString(new Date())!,
    status: NotificationStatus.Read,
    id: 1,
  },
  {
    __typename: 'ContractDocumentExpiredNotification',
    isContractActive: true,
    isContractSublocated: true,
    entityId: 0,
    username: 'username',
    timestamp: parseDateToString(new Date())!,
    status: NotificationStatus.Read,
    id: 2,
  },
  {
    __typename: 'EstateDocumentExpiredNotification',
    entityId: 0,
    username: 'username',
    timestamp: parseDateToString(new Date())!,
    status: NotificationStatus.Read,
    id: 3,
  },
  {
    __typename: 'EstateUnitDocumentExpiredNotification',
    entityId: 0,
    username: 'username',
    timestamp: parseDateToString(new Date())!,
    status: NotificationStatus.Read,
    id: 4,
  },
  {
    __typename: 'SubjectDocumentExpiredNotification',
    entityId: 0,
    username: 'username',
    timestamp: parseDateToString(new Date())!,
    status: NotificationStatus.Read,
    id: 5,
  },
];

export const NotificationsListWidget = ({ useBoxShadow, useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [queryState] = useGetNotificationsQuery({ pause: useMockData, variables: { first: 5 } });

  const data = useMemo(
    () =>
      (useMockData ? mockData : (queryState.data?.notification.listNotifications?.nodes ?? [])).map((it) =>
        parseNotificationFragmentToNotificationItem(it, t),
      ),
    [queryState.data?.notification.listNotifications?.nodes, t, useMockData],
  );

  const handleViewAll = useCallback(() => {
    if (useMockData) return;
    navigate('/app/notifications');
  }, [navigate, useMockData]);

  return (
    <DashboardWidgetContainer isLoading={queryState.fetching} useBoxShadow={useBoxShadow}>
      <Box sx={{ display: 'flex', flexDirection: 'column', px: 2 }}>
        <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700], pb: '20px' })}>
          {t('component.dashboard_widget.notifications_list.title')}
        </Typography>
        <Divider flexItem />
        <Stack divider={<Divider flexItem />}>
          {data.length === 0 && (
            <Typography
              variant="bodySm"
              sx={(theme) => ({ color: theme.palette.grey[700], textAlign: 'center', mt: 2 })}
            >
              {t('component.dashboard_widget.notifications_list.no_notifications')}
            </Typography>
          )}
          {data.map((notification, i) => (
            <NotificationView key={i} notification={notification} readonly={useMockData} sx={{ px: 1.5 }} />
          ))}
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
        <Typography
          variant="link"
          sx={{ textAlign: 'center', alignItems: 'flex-end', display: 'flex' }}
          onClick={handleViewAll}
        >
          {t('component.dashboard_widget.notifications_list.view_all')}
          <ChevronRight
            sx={{
              width: '16px',
            }}
          />
        </Typography>
      </Box>
    </DashboardWidgetContainer>
  );
};
