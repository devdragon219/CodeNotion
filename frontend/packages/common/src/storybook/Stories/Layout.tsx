import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { ParseKeys } from 'i18next';

import { Stepper } from '../../../lib/components/Stepper/Stepper';
import { Tabs } from '../../../lib/components/Tabs/Tabs';

export const LayoutStories = () => (
  <Stack spacing={3}>
    <Card>
      <CardHeader title="Stepper" />
      <CardContent>
        <Stack spacing={3}>
          <Stepper
            activeStep={0}
            steps={[
              {
                label: 'First' as ParseKeys,
              },
              {
                label: 'Second' as ParseKeys,
              },
              {
                label: 'Third' as ParseKeys,
              },
            ]}
          />
          <Stepper
            activeStep={0}
            error="Error"
            steps={[
              {
                label: 'First' as ParseKeys,
              },
              {
                label: 'Second' as ParseKeys,
              },
              {
                label: 'Third' as ParseKeys,
              },
            ]}
          />
        </Stack>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Tabs" />
      <CardContent>
        <Stack spacing={3}>
          <Tabs
            tabs={[
              {
                label: 'First' as ParseKeys,
              },
              {
                label: 'Second' as ParseKeys,
              },
              {
                label: 'Third' as ParseKeys,
              },
            ]}
          />
          <Tabs
            tabs={[
              {
                error: true,
                label: 'First' as ParseKeys,
              },
              {
                label: 'Second' as ParseKeys,
              },
              {
                label: 'Third' as ParseKeys,
              },
            ]}
          />
        </Stack>
      </CardContent>
    </Card>
  </Stack>
);
