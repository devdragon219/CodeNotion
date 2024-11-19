import { AlertProps } from '@mui/material';
import { SnackbarKey } from 'notistack';

import { ValidationError } from '../../gql/types';

export type SnackbarOptions =
  | AlertProps['severity']
  | {
      persist?: boolean;
      severity?: AlertProps['severity'];
    };

export interface SnackbarContextProps {
  closeSnackbar: (key: SnackbarKey) => void;
  showError: (errors?: (ValidationError | null)[] | null, message?: string) => SnackbarKey;
  showSnackbar: (message: string, options?: SnackbarOptions) => SnackbarKey;
}
