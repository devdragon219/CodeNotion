import { StepProps as MuiStepProps, StepperProps as MuiStepperProps } from '@mui/material';
import { PropsWithChildren } from 'react';

import { Step } from '../Stepper.types';

export type StepItemProps = PropsWithChildren<
  Omit<MuiStepProps, 'index'> &
    Omit<Step, 'children'> & {
      activeStep: number;
      error?: boolean | string;
      index: number;
      orientation?: MuiStepperProps['orientation'];
    }
>;
