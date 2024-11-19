import { NotificationsOutlined } from '@mui/icons-material';
import { Badge, Box, ClickAwayListener, Divider, IconButton, Paper, Popper, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_BORDER_RADIUS } from '../../../configs/defaults';
import { useNotification } from '../../../contexts/notification/hook';
import { NotificationStatus } from '../../../gql/types';
import { NotificationView } from '../../NotificationView/NotificationView';
import { Transition } from '../../Transition/Transition';
import { NotificationsProps } from './Notifications.types';

export const Notifications = ({ redirect }: NotificationsProps) => {
  const { notifications, markNotificationsAsRead, markNotificationsAsView } = useNotification();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const newNotifications = useMemo(
    () => notifications.filter(({ status }) => status === NotificationStatus.New).length,
    [notifications],
  );

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    void markNotificationsAsRead();
  }, [markNotificationsAsRead]);

  const handleClose = useCallback(() => {
    setOpen(false);
    void markNotificationsAsView();
  }, [markNotificationsAsView]);

  const handleShowAll = useCallback(() => {
    handleClose();
    navigate(redirect);
  }, [handleClose, navigate, redirect]);

  const handleClickAway = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (anchorRef.current && !anchorRef.current.contains(event.target as HTMLElement)) {
        handleClose();
      }
    },
    [handleClose],
  );

  return (
    <>
      <Badge badgeContent={newNotifications} invisible={notifications.length === 0}>
        <IconButton ref={anchorRef} color="tertiary" size="large" onClick={handleToggle}>
          <NotificationsOutlined />
        </IconButton>
      </Badge>

      <Popper placement="bottom-end" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Transition type="grow" in={open} position="top" {...TransitionProps} unmountOnExit>
              <Paper variant="elevation">
                <Box
                  sx={(theme) => ({
                    width: '320px',
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
                    [theme.breakpoints.down('md')]: {
                      width: '100%',
                    },
                  })}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, pt: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <Typography
                        variant="h4"
                        sx={(theme) => ({
                          color: theme.palette.grey[800],
                        })}
                      >
                        {t('common.component.header.notification.notifications')}
                      </Typography>
                      {newNotifications !== 0 && (
                        <Typography
                          variant="bodySm"
                          sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: theme.palette.common.white,
                            backgroundColor: theme.palette.blue[500],
                            borderRadius: '23px',
                            height: '24px',
                            width: '24px',
                          })}
                        >
                          {newNotifications}
                        </Typography>
                      )}
                    </Box>
                    {notifications.length !== 0 && (
                      <Typography variant="link" onClick={handleMarkAllAsRead}>
                        {t('common.component.header.notification.mark_all')}
                      </Typography>
                    )}
                  </Box>
                  <Divider flexItem />
                  {notifications.length === 0 ? (
                    <Box sx={{ px: 3, pt: 2, pb: 3 }}>
                      <Typography variant="bodySm" sx={(theme) => ({ color: theme.palette.grey[600] })}>
                        {t('common.component.header.notification.no_notifications')}
                      </Typography>
                    </Box>
                  ) : (
                    <Stack
                      divider={<Divider flexItem />}
                      sx={(theme) => ({
                        maxHeight: '420px',
                        overflowY: 'auto',
                        [theme.breakpoints.down('md')]: {
                          maxHeight: '320px',
                        },
                      })}
                    >
                      {notifications.map((notification) => (
                        <NotificationView key={notification.id} notification={notification} />
                      ))}
                    </Stack>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 1.25 }}>
                    <Typography variant="link" onClick={handleShowAll}>
                      {t('common.component.header.notification.show_all')}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Transition>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};
