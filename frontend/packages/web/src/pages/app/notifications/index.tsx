import { CheckCircleOutline, ChevronLeft } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';
import { Loader, PrimaryTable } from '@realgimm5/frontend-common/components';
import { useNotification, useSnackbar, useTable } from '@realgimm5/frontend-common/contexts';
import { NotificationStatus } from '@realgimm5/frontend-common/gql/types';
import { useNavigateBack } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NotificationFragment } from '../../../gql/RealGimm.Web.Notification.fragment';
import {
  DeleteNotificationsDocument,
  GetAllNotificationsQueryVariables,
  useGetAllNotificationsQuery,
} from '../../../gql/RealGimm.Web.Notification.operation';
import { getNotificationsColumns } from '../../../utils/notification/getNotificationsColumns';
import { parseNotificationFragmentToNotificationItem } from '../../../utils/notification/parseNotificationFragment';

export default function Notifications() {
  const { t } = useTranslation();
  const { handleDelete } = useTable<GetAllNotificationsQueryVariables>();
  const [loading, setLoading] = useState(false);
  const { showError, showSnackbar } = useSnackbar();
  const goBack = useNavigateBack('/app/home');
  const { markNotificationsAsRead, openNotification, updateNotifications } = useNotification();
  const [queryState, reexecuteQuery] = useGetAllNotificationsQuery();
  const notifications = useMemo(() => queryState.data?.notification.listNotificationsFull, [queryState.data]);

  const handleMarkNotificationsAsRead = useCallback(
    async (rows?: NotificationFragment | NotificationFragment[]) => {
      setLoading(true);
      const notifications = rows
        ? (Array.isArray(rows) ? rows : [rows]).map((row) => parseNotificationFragmentToNotificationItem(row, t))
        : undefined;
      const result = await markNotificationsAsRead(notifications);
      setLoading(false);
      if (result.data?.notification.markAsRead.isSuccess) {
        showSnackbar(
          t(`notification.feedback.mark.${Array.isArray(rows) && rows.length > 1 ? 'multiple' : 'single'}`),
          'success',
        );
      } else {
        showError(result.data?.notification.markAsRead.validationErrors);
      }
    },
    [markNotificationsAsRead, showError, showSnackbar, t],
  );

  const handleViewNotification = useCallback(
    (row: NotificationFragment) => {
      const notification = parseNotificationFragmentToNotificationItem(row, t);
      openNotification(notification);
    },
    [openNotification, t],
  );

  return (
    <Card>
      {(queryState.fetching || loading) && <Loader />}
      <Box sx={{ px: 1, pt: 2 }}>
        <Button color="secondary" variant="text" startIcon={<ChevronLeft />} onClick={goBack}>
          {t('common.button.back')}
        </Button>
      </Box>
      <CardHeader title={t('notification.title')} titleTypographyProps={{ variant: 'h1' }} />
      <CardContent>
        <PrimaryTable
          columns={getNotificationsColumns(t)}
          customRowActions={[
            {
              context: 'row',
              icon: CheckCircleOutline,
              id: 'mark_row',
              label: 'notification.action.mark_row',
              onClick: handleMarkNotificationsAsRead,
            },
            {
              context: 'rows',
              icon: CheckCircleOutline,
              id: 'mark_rows',
              label: 'notification.action.mark_rows',
              onClick: handleMarkNotificationsAsRead,
            },
          ]}
          customTableActions={[
            {
              icon: CheckCircleOutline,
              id: 'mark_all',
              label: 'notification.action.mark_all',
              onClick: handleMarkNotificationsAsRead,
            },
          ]}
          empty="notification.text.no_notifications"
          rows={notifications ?? []}
          useColumnVisibility={false}
          getRowId={({ id }) => String(id)}
          getRowStyle={(row, theme) =>
            row.status === NotificationStatus.Read ? {} : { backgroundColor: theme.palette.blue[10] }
          }
          onDelete={handleDelete('notification', DeleteNotificationsDocument, () => {
            reexecuteQuery();
            updateNotifications();
          })}
          onView={handleViewNotification}
        />
      </CardContent>
    </Card>
  );
}
