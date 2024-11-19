import { Box, Container, CssBaseline, Paper, Theme, useMediaQuery } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import {
  DEFAULT_BORDER_RADIUS,
  DEFAULT_CLOSE_DRAWER_WIDTH,
  DEFAULT_CLOSE_DRAWER_WIDTH_LOW_VIEWPORT,
  DEFAULT_HEADER_HEIGHT,
  DEFAULT_OPEN_DRAWER_WIDTH,
  DEFAULT_OPEN_DRAWER_WIDTH_LOW_VIEWPORT,
} from '../../configs/defaults';
import { useAuth } from '../../contexts/auth/hook';
import { useSidebar } from '../../contexts/sidebar/hook';
import { AppLayoutProps } from './App.types';

export const AppLayout = ({ menu, redirect, unsupportedFeatures }: AppLayoutProps) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const matchDownLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const { isSidebarOpen, handleToggleSidebar } = useSidebar();

  useEffect(() => {
    handleToggleSidebar(!matchDownLg);
  }, [handleToggleSidebar, matchDownLg]);

  useEffect(() => {
    if (!isSignedIn) {
      navigate(redirect.login, { replace: true });
    }
    // eslint-disable-next-line
  }, [isSignedIn]);

  const handleCloseDrawer = useCallback(() => {
    handleToggleSidebar(false);
  }, [handleToggleSidebar]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Header menu={menu} redirect={redirect} />
      <Sidebar menu={menu} open={isSidebarOpen} unsupportedFeatures={unsupportedFeatures} onClose={handleCloseDrawer} />
      <Paper
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[200],
          minHeight: `calc(100vh - ${DEFAULT_HEADER_HEIGHT}px)`,
          flexGrow: 1,
          padding: '20px',
          marginTop: `${DEFAULT_HEADER_HEIGHT}px`,
          marginRight: 2,
          borderRadius: `${DEFAULT_BORDER_RADIUS}px ${DEFAULT_BORDER_RADIUS}px 0 0`,
          [theme.breakpoints.up('md')]: {
            ...(isSidebarOpen
              ? {
                  transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.shorter + 200,
                  }),
                  width: `calc(100% - ${DEFAULT_OPEN_DRAWER_WIDTH + 16}px)`,
                }
              : {
                  transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.shorter + 200,
                  }),
                  width: `calc(100% - ${DEFAULT_CLOSE_DRAWER_WIDTH + 16}px)`,
                }),
          },
          [theme.breakpoints.down('lg')]: {
            marginRight: 1.5,
            ...(isSidebarOpen
              ? {
                  width: `calc(100% - ${DEFAULT_OPEN_DRAWER_WIDTH_LOW_VIEWPORT + 16}px)`,
                }
              : {
                  width: `calc(100% - ${DEFAULT_CLOSE_DRAWER_WIDTH_LOW_VIEWPORT + 16}px)`,
                }),
          },
          [theme.breakpoints.down('md')]: {
            marginLeft: 2,
            padding: 2,
            width: 'calc(100% - 32px)',
          },
        })}
      >
        <Container maxWidth={false} sx={{ px: { xs: 0 } }}>
          <Outlet />
        </Container>
      </Paper>
    </Box>
  );
};
