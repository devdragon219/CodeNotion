import { Box, Grid2, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { parseSxPropsToArray } from '../../utils/muiUtils';
import { SectionTitleProps } from './SectionTitle.types';

export const SectionTitle = ({ actions, sx, value }: SectionTitleProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 size={12}>
      <Box
        sx={[
          { display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'space-between' },
          ...parseSxPropsToArray(sx),
        ]}
      >
        <Typography sx={(theme) => ({ color: theme.palette.grey[700] })} variant="h5">
          {t(value)}
        </Typography>
        {actions && (
          <Stack direction="row" gap={1}>
            {actions}
          </Stack>
        )}
      </Box>
    </Grid2>
  );
};
