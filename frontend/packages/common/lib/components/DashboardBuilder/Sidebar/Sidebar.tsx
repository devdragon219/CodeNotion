import { Box, Grid2 } from '@mui/material';

import { SectionTitle } from '../../SectionTitle/SectionTitle';
import { DashboardBuilderSidebarDraggableField } from './DraggableWidget/DraggableWidget';
import { DashboardBuilderSidebarProps } from './Sidebar.types';

export const DashboardBuilderSidebar = ({ widgetConfigurations }: DashboardBuilderSidebarProps) => (
  <Box
    sx={{
      alignSelf: 'start',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}
  >
    <SectionTitle value="common.component.dashboard_builder.sidebar.title" />
    <Grid2 container spacing={1}>
      {widgetConfigurations.map((widgetConfiguration) => (
        <DashboardBuilderSidebarDraggableField
          key={widgetConfiguration.type}
          widgetConfiguration={widgetConfiguration}
        />
      ))}
    </Grid2>
  </Box>
);
