import { Logout, PersonOutline, Settings } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { MouseEvent as ReactMouseEvent, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_BORDER_RADIUS } from '../../../configs/defaults';
import { useAuth } from '../../../contexts/auth/hook';
import { Transition } from '../../Transition/Transition';
import { UserMenuProps } from './UserMenu.types';

export const UserMenu = ({ redirect }: UserMenuProps) => {
  const { signOut, user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);
  const handleClose = useCallback((event: ReactMouseEvent | MouseEvent | TouchEvent) => {
    if (anchorRef.current && !anchorRef.current.contains(event.target as HTMLElement)) {
      setOpen(false);
    }
  }, []);

  const goToProfile = useCallback(
    (event: ReactMouseEvent) => {
      handleClose(event);
      navigate(redirect);
    },
    [handleClose, navigate, redirect],
  );

  return (
    <>
      <IconButton ref={anchorRef} color="primary" size="large" sx={{ borderRadius: '35px' }} onClick={handleToggle}>
        <PersonOutline />
      </IconButton>

      <Popper placement="bottom-end" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transition type="grow" in={open} position="top" {...TransitionProps} unmountOnExit>
              <Paper variant="elevation">
                <Box sx={{ p: 2, pb: 0 }}>
                  <Stack sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                      <Typography variant="h4">{t('common.component.header.profile.welcome')},</Typography>
                      <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}></Typography>
                    </Stack>
                    <Typography variant="bodySm">{user?.username}</Typography>
                  </Stack>
                  <Divider />
                </Box>
                <Box sx={{ p: 2, pt: 0 }}>
                  <List
                    component="nav"
                    sx={(theme) => ({
                      width: '100%',
                      maxWidth: 350,
                      minWidth: 300,
                      borderRadius: '10px',
                      [theme.breakpoints.down('md')]: {
                        minWidth: '100%',
                      },
                    })}
                  >
                    <ListItemButton sx={{ borderRadius: `${DEFAULT_BORDER_RADIUS}px` }} onClick={goToProfile}>
                      <ListItemIcon>
                        <Settings sx={{ strokeWidth: 1.5, fontSize: '1.3rem' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="bodyMd">
                            {t('common.component.header.profile.account_settings')}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton sx={{ borderRadius: `${DEFAULT_BORDER_RADIUS}px` }} onClick={signOut}>
                      <ListItemIcon>
                        <Logout sx={{ strokeWidth: 1.5, fontSize: '1.3rem' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="bodyMd">{t('common.component.header.profile.logout')}</Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </Box>
              </Paper>
            </Transition>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};
