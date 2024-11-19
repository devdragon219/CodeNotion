/* eslint-disable no-restricted-imports */
import { CheckCircle, Error, Info, Warning } from '@mui/icons-material';
import { Alert as MuiAlert, Typography } from '@mui/material';

import { AlertProps } from './Alert.types';

export const Alert = ({ message, severity = 'info' }: AlertProps) => (
  <MuiAlert
    severity={severity}
    variant="outlined"
    iconMapping={{
      info: <Info />,
      success: <CheckCircle />,
      warning: <Warning />,
      error: <Error />,
    }}
  >
    <Typography variant="h5">{message}</Typography>
  </MuiAlert>
);
