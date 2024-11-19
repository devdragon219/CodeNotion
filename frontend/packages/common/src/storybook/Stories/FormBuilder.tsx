import { Card, CardContent, CardHeader, Stack } from '@mui/material';

import { FormBuilder } from '../../../lib/components/FormBuilder/FormBuilder';

export const FormBuilderStories = () => (
  <Card>
    <CardHeader title="Form builder" />
    <CardContent>
      <Stack spacing={3}>
        <FormBuilder />
        <FormBuilder disabled />
        <FormBuilder readonly />
      </Stack>
    </CardContent>
  </Card>
);
