import { Typography } from '@mui/material';
import { TFunction } from 'i18next';

export const NoEvents = (t: TFunction) => {
  const Content = () => (
    <Typography variant="h5" sx={(theme) => ({ color: theme.palette.grey[700] })}>
      {t('common.component.calendar.no_events')}
    </Typography>
  );

  return Content;
};
