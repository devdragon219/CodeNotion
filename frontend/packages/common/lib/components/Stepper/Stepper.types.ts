import { SxProps, Theme } from '@mui/material';
import { ParseKeys } from 'i18next';
import { PropsWithChildren } from 'react';

export type Step = PropsWithChildren<{
  label: ParseKeys;
  message?: ParseKeys;
}>;

export interface StepperProps {
  activeStep: number;
  error?: boolean | string;
  steps: Step[];
  sx?: SxProps<Theme>;
}
