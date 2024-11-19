import { SxProps, Theme } from '@mui/material';
import { PropsWithChildren } from 'react';

export type DashboardWidgetContainerProps = PropsWithChildren<{
  isLoading?: boolean;
  sx?: SxProps<Theme>;
  useBoxShadow?: boolean;
}>;
