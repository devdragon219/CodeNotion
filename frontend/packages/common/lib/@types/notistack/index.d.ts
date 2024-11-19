import { AlertProps } from '@mui/material';
import 'notistack';

import { ValidationError } from '../../gql/types';

declare module 'notistack' {
  interface VariantOverrides {
    default: {
      errors?: ValidationError[];
      severity?: AlertProps['severity'];
    };
  }
}
