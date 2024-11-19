import { AlertProps } from '@mui/material';
import { CustomContentProps } from 'notistack';

import { ValidationError } from '../../gql/types';

export interface SnackbarContentProps extends CustomContentProps {
  errors?: ValidationError[];
  severity?: AlertProps['severity'];
}
