import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

export const TypographyStories = () => (
  <Stack spacing={3}>
    <Card>
      <CardHeader title="Typography" />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h1">H1</Typography>
        <Typography variant="h2">H2</Typography>
        <Typography variant="h3">H3</Typography>
        <Typography variant="h4">H4</Typography>
        <Typography variant="h5">H5</Typography>

        <Typography variant="bodyLg">Body-Lg</Typography>
        <Typography variant="bodyMd">Body-Md</Typography>
        <Typography variant="bodySm">Body-Sm</Typography>
        <Typography variant="link">Link</Typography>
        <Typography variant="caption">Caption</Typography>
      </CardContent>
    </Card>
  </Stack>
);
