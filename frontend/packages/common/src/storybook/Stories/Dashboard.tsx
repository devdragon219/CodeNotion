import { Card, CardContent, CardHeader, Stack } from '@mui/material';

import { DashboardBuilder } from '../../../lib/components/DashboardBuilder/DashboardBuilder';

export const DashboardStories = () => (
  <Stack spacing={3}>
    <Card>
      <CardHeader title="Dashboard builder" />
      <CardContent>
        <DashboardBuilder widgetConfigurations={[]} />
      </CardContent>
    </Card>
  </Stack>
);
