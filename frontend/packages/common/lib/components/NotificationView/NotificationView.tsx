import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useNotification } from '../../contexts/notification/hook';
import { NotificationStatus } from '../../gql/types';
import { getDateLocale } from '../../i18n/i18n';
import { parseSxPropsToArray } from '../../utils/muiUtils';
import { NotificationViewProps } from './NotificationView.types';

export const NotificationView = ({ notification, readonly, sx }: NotificationViewProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { openNotification } = useNotification();

  const clickable = useMemo(() => !readonly && !!notification.url, [notification.url, readonly]);

  const distance = useMemo(
    () => formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: getDateLocale(language) }),
    [notification.timestamp, language],
  );

  const handleDownload = useCallback(() => {
    if (readonly) return;
    openNotification(notification);
  }, [notification, openNotification, readonly]);

  const handleClick = useCallback(() => {
    if (!clickable) return;
    openNotification(notification);
  }, [clickable, notification, openNotification]);

  return (
    <Box
      onClick={handleClick}
      sx={[
        (theme) => ({
          position: 'relative',
          px: 3.5,
          py: 1.25,
          backgroundColor:
            notification.status === NotificationStatus.Read ? theme.palette.background.default : theme.palette.blue[10],
          ...(clickable
            ? {
                cursor: 'pointer',
              }
            : {}),
        }),
        ...parseSxPropsToArray(sx),
      ]}
    >
      {notification.status === NotificationStatus.New && (
        <Box
          sx={(theme) => ({
            position: 'absolute',
            backgroundColor: theme.palette.blue[500],
            width: '8px',
            height: '8px',
            top: '24px',
            left: '16px',
            borderRadius: '50%',
          })}
        />
      )}
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={(theme) => ({
            color: theme.palette.blue[500],
            backgroundColor:
              notification.status === NotificationStatus.Read
                ? theme.palette.blue[10]
                : theme.palette.background.default,
          })}
        >
          {notification.icon}
        </Avatar>
        <Stack spacing={1.25} sx={{ flex: 1 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between' }} spacing={0.5}>
            <Typography variant="h5" sx={(theme) => ({ color: theme.palette.grey[700] })}>
              {notification.title}
            </Typography>
            <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
              {distance}
            </Typography>
          </Stack>
          <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
            {notification.description}
          </Typography>
          {notification.downloadUrl && (
            <Box>
              <Button
                color="tertiary"
                variant="outlined"
                size="medium"
                sx={{ minWidth: '110px' }}
                onClick={handleDownload}
              >
                {t('common.button.download')}
              </Button>
            </Box>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
