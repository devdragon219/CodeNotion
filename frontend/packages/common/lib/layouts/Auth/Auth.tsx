import { Box, Paper } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth/hook';
import { AuthLayoutProps } from './Auth.types';

export const AuthLayout = ({ redirect }: AuthLayoutProps) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate(redirect, { replace: true });
    }
    // eslint-disable-next-line
  }, [isSignedIn]);

  return (
    <Paper sx={(theme) => ({ backgroundColor: theme.palette.blue[10], minHeight: '100vh' })}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Box sx={{ m: { xs: 1, sm: 3 } }}>
          <Paper
            sx={{
              maxWidth: { xs: 400, lg: 475 },
              margin: { xs: 2.5, md: 3 },
              '& > *': {
                flexGrow: 1,
                flexBasis: '50%',
              },
            }}
          >
            <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
              <Outlet />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Paper>
  );
};
