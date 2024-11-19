import { SxProps, Theme } from '@mui/material';
import { DOMAttributes, PropsWithChildren } from 'react';

import { StepActionsProps } from '../StepActions/StepActions.types';

export type StepFormProps = PropsWithChildren<
  StepActionsProps & {
    sx?: SxProps<Theme>;
    onSubmit?: DOMAttributes<HTMLFormElement>['onSubmit'];
  }
>;
