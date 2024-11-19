import { Box, Skeleton } from '@mui/material';

import { DEFAULT_BORDER_RADIUS } from '../../configs/defaults';
import { parseSxPropsToArray } from '../../utils/muiUtils';
import { DashboardWidgetContainerProps } from './DashboardWidgetContainer.types';

export const DashboardWidgetContainer = ({ children, isLoading, sx, useBoxShadow }: DashboardWidgetContainerProps) => (
  <Box
    sx={[
      (theme) => ({
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
        justifyContent: 'space-between',
        py: 3,
        ...(!isLoading && {
          borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
          ...(useBoxShadow && {
            boxShadow: `0 0 10px rgba(0, 0, 0, 0.25)`,
          }),
        }),
      }),
      ...parseSxPropsToArray(sx),
    ]}
  >
    {isLoading ? <Skeleton variant="rounded" sx={{ position: 'absolute', inset: 0, height: '100%' }} /> : children}
  </Box>
);
