import { Menu } from '@mui/icons-material';
import { AppBar, Box, IconButton, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_OPEN_DRAWER_WIDTH,
  DEFAULT_OPEN_DRAWER_WIDTH_LOW_VIEWPORT,
} from '../../configs/defaults';
import { useSidebar } from '../../contexts/sidebar/hook';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { HeaderProps } from './Header.types';
import { Localization } from './Localization/Localization';
import { Notifications } from './Notifications/Notifications';
import { UserMenu } from './UserMenu/UserMenu';

export const Header = ({ menu, redirect }: HeaderProps) => {
  const matchUpMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const { handleToggleSidebar } = useSidebar();

  const handleMenuIconClick = useCallback(() => {
    handleToggleSidebar();
  }, [handleToggleSidebar]);

  return (
    <AppBar
      enableColorOnDark
      position="fixed"
      color="inherit"
      elevation={0}
      variant="flat"
      sx={(theme) => ({ bgcolor: theme.palette.background.default })}
    >
      <Toolbar
        sx={(theme) => ({
          m: 2,
          p: 1,
          borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
          [theme.breakpoints.up('sm')]: {
            px: 2,
          },
          [theme.breakpoints.down('lg')]: {
            maxWidth: 'calc(100vw - 24px)',
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            gap: 1,
            [theme.breakpoints.up('lg')]: {
              width: `${DEFAULT_OPEN_DRAWER_WIDTH - 24}px`,
            },
            [theme.breakpoints.down('lg')]: {
              width: `${DEFAULT_OPEN_DRAWER_WIDTH_LOW_VIEWPORT - 24}px`,
            },
          })}
        >
          <IconButton color="tertiary" size="large" onClick={handleMenuIconClick}>
            <Menu />
          </IconButton>
          {matchUpMd && (
            <Link to="/" style={{ height: '36px' }}>
              <img src={logo} style={{ height: '36px' }} />
            </Link>
          )}
        </Box>
        {matchUpMd && <Breadcrumbs menu={menu} />}
        <Box sx={{ display: 'flex', gap: '10px', ml: 'auto' }}>
          <Localization />
          {redirect.notifications && <Notifications redirect={redirect.notifications} />}
          <UserMenu redirect={redirect.profile} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
