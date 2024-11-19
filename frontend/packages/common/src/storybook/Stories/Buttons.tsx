import { LayersOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, Grid2, IconButton, Stack, Typography } from '@mui/material';

export const ButtonStories = () => (
  <Stack spacing={3}>
    <Card>
      <CardHeader title="Contained button" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Small</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="contained" size="small">
                  Primary
                </Button>
                <Button color="secondary" variant="contained" size="small">
                  Secondary
                </Button>
                <Button color="tertiary" variant="contained" size="small">
                  Tertiary
                </Button>
                <Button color="destructive" variant="contained" size="small">
                  Destructive
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="contained" size="small" disabled>
                  Primary
                </Button>
                <Button color="secondary" variant="contained" size="small" disabled>
                  Secondary
                </Button>
                <Button color="tertiary" variant="contained" size="small" disabled>
                  Tertiary
                </Button>
                <Button color="destructive" variant="contained" size="small" disabled>
                  Destructive
                </Button>
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Medium</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="contained" size="medium">
                  Primary
                </Button>
                <Button color="secondary" variant="contained" size="medium">
                  Secondary
                </Button>
                <Button color="tertiary" variant="contained" size="medium">
                  Tertiary
                </Button>
                <Button color="destructive" variant="contained" size="medium">
                  Destructive
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="contained" size="medium" disabled>
                  Primary
                </Button>
                <Button color="secondary" variant="contained" size="medium" disabled>
                  Secondary
                </Button>
                <Button color="tertiary" variant="contained" size="medium" disabled>
                  Tertiary
                </Button>
                <Button color="destructive" variant="contained" size="medium" disabled>
                  Destructive
                </Button>
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Large</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="contained" size="large">
                  Primary
                </Button>
                <Button color="secondary" variant="contained" size="large">
                  Secondary
                </Button>
                <Button color="tertiary" variant="contained" size="large">
                  Tertiary
                </Button>
                <Button color="destructive" variant="contained" size="large">
                  Destructive
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="contained" size="large" disabled>
                  Primary
                </Button>
                <Button color="secondary" variant="contained" size="large" disabled>
                  Secondary
                </Button>
                <Button color="tertiary" variant="contained" size="large" disabled>
                  Tertiary
                </Button>
                <Button color="destructive" variant="contained" size="large" disabled>
                  Destructive
                </Button>
              </Box>
            </Stack>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Outlined button" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Small</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="outlined" size="small">
                  Primary
                </Button>
                <Button color="secondary" variant="outlined" size="small">
                  Secondary
                </Button>
                <Button color="tertiary" variant="outlined" size="small">
                  Tertiary
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="outlined" size="small" disabled>
                  Primary
                </Button>
                <Button color="secondary" variant="outlined" size="small" disabled>
                  Secondary
                </Button>
                <Button color="tertiary" variant="outlined" size="small" disabled>
                  Tertiary
                </Button>
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Medium</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="outlined" size="medium">
                  Primary
                </Button>
                <Button color="secondary" variant="outlined" size="medium">
                  Secondary
                </Button>
                <Button color="tertiary" variant="outlined" size="medium">
                  Tertiary
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="outlined" size="medium" disabled>
                  Primary
                </Button>
                <Button color="secondary" variant="outlined" size="medium" disabled>
                  Secondary
                </Button>
                <Button color="tertiary" variant="outlined" size="medium" disabled>
                  Tertiary
                </Button>
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Large</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="outlined" size="large">
                  Primary
                </Button>
                <Button color="secondary" variant="outlined" size="large">
                  Secondary
                </Button>
                <Button color="tertiary" variant="outlined" size="large">
                  Tertiary
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="outlined" size="large" disabled>
                  Primary
                </Button>
                <Button color="secondary" variant="outlined" size="large" disabled>
                  Secondary
                </Button>
                <Button color="tertiary" variant="outlined" size="large" disabled>
                  Tertiary
                </Button>
              </Box>
            </Stack>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Text button" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Small</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="text" size="small">
                  Primary
                </Button>
                <Button color="secondary" variant="text" size="small">
                  Secondary
                </Button>
                <Button color="tertiary" variant="text" size="small">
                  Tertiary
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="text" size="small" disabled>
                  Primary
                </Button>
                <Button color="secondary" variant="text" size="small" disabled>
                  Secondary
                </Button>
                <Button color="tertiary" variant="text" size="small" disabled>
                  Tertiary
                </Button>
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Medium</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="text" size="medium">
                  Primary
                </Button>
                <Button color="secondary" variant="text" size="medium">
                  Secondary
                </Button>
                <Button color="tertiary" variant="text" size="medium">
                  Tertiary
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="text" size="medium" disabled>
                  Primary
                </Button>
                <Button color="secondary" variant="text" size="medium" disabled>
                  Secondary
                </Button>
                <Button color="tertiary" variant="text" size="medium" disabled>
                  Tertiary
                </Button>
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Large</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="text" size="large">
                  Primary
                </Button>
                <Button color="secondary" variant="text" size="large">
                  Secondary
                </Button>
                <Button color="tertiary" variant="text" size="large">
                  Tertiary
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Button color="primary" variant="text" size="large" disabled>
                  Primary
                </Button>
                <Button color="secondary" variant="text" size="large" disabled>
                  Secondary
                </Button>
                <Button color="tertiary" variant="text" size="large" disabled>
                  Tertiary
                </Button>
              </Box>
            </Stack>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
    <Card>
      <CardHeader title="Icon button" />
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Small</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <IconButton color="primary" size="small">
                  <LayersOutlined />
                </IconButton>
                <IconButton color="secondary" size="small">
                  <LayersOutlined />
                </IconButton>
                <IconButton color="tertiary" size="small">
                  <LayersOutlined />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <IconButton color="primary" size="small" disabled>
                  <LayersOutlined />
                </IconButton>
                <IconButton color="secondary" size="small" disabled>
                  <LayersOutlined />
                </IconButton>
                <IconButton color="tertiary" size="small" disabled>
                  <LayersOutlined />
                </IconButton>
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Medium</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <IconButton color="primary" size="medium">
                  <LayersOutlined />
                </IconButton>
                <IconButton color="secondary" size="medium">
                  <LayersOutlined />
                </IconButton>
                <IconButton color="tertiary" size="medium">
                  <LayersOutlined />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <IconButton color="primary" size="medium" disabled>
                  <LayersOutlined />
                </IconButton>
                <IconButton color="secondary" size="medium" disabled>
                  <LayersOutlined />
                </IconButton>
                <IconButton color="tertiary" size="medium" disabled>
                  <LayersOutlined />
                </IconButton>
              </Box>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={3}>
              <Typography variant="bodyLg">Large</Typography>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <IconButton color="primary" size="large">
                  <LayersOutlined />
                </IconButton>
                <IconButton color="secondary" size="large">
                  <LayersOutlined />
                </IconButton>
                <IconButton color="tertiary" size="large">
                  <LayersOutlined />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <IconButton color="primary" size="large" disabled>
                  <LayersOutlined />
                </IconButton>
                <IconButton color="secondary" size="large" disabled>
                  <LayersOutlined />
                </IconButton>
                <IconButton color="tertiary" size="large" disabled>
                  <LayersOutlined />
                </IconButton>
              </Box>
            </Stack>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  </Stack>
);
