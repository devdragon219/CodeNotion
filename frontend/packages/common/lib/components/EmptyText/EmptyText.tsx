import { Grid2, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptyTextProps } from './EmptyText.types';

export const EmptyText = ({ value, useGrid = true }: EmptyTextProps) => {
  const { t } = useTranslation();
  const text = useMemo(
    () => (
      <Typography sx={(theme) => ({ color: theme.palette.grey[700] })} variant="bodySm">
        {t(value)}
      </Typography>
    ),
    [t, value],
  );

  return useGrid ? <Grid2 size={12}>{text}</Grid2> : text;
};
