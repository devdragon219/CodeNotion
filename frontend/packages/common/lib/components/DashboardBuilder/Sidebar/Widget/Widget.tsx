import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DashboardBuilderSidebarWidgetProps } from './Widget.types';

export const DashboardBuilderSidebarWidget = ({ overlay, widgetConfiguration }: DashboardBuilderSidebarWidgetProps) => {
  const { t } = useTranslation();

  return (
    <Paper
      square
      variant="outlined"
      sx={{
        cursor: overlay ? 'grabbing' : 'grab',
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        height: '64px',
        p: 2,
      }}
    >
      {widgetConfiguration.icon}
      <Typography
        variant="bodyMd"
        sx={(theme) => ({ color: theme.palette.grey[700], lineHeight: 1.2, flexWrap: 'nowrap' })}
      >
        {t(widgetConfiguration.title)}
      </Typography>
    </Paper>
  );
};
