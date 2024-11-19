import { SxProps, Theme } from '@mui/material';
import { PropsWithChildren } from 'react';

export type StepContentProps = PropsWithChildren<{
  sx?: SxProps<Theme>;
}>;
