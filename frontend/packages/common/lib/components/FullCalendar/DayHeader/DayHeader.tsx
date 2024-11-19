import { DayHeaderContentArg } from '@fullcalendar/core/index.js';
import { Stack, Typography } from '@mui/material';
import { format } from 'date-fns';

import { getDateLocale } from '../../../i18n/i18n';

export const DayHeader = (language: string) => {
  const Content = ({ date, view }: DayHeaderContentArg) =>
    view.type === 'timeGridWeek' ? (
      <Stack>
        <Typography
          variant="bodySm"
          sx={(theme) => ({
            color: theme.palette.grey[500],
            textTransform: 'uppercase',
          })}
        >
          {format(date, 'EEE', {
            locale: getDateLocale(language),
          })}
        </Typography>
        <Typography
          variant="h3"
          sx={(theme) => ({
            color: theme.palette.grey[700],
          })}
        >
          {format(date, 'dd')}
        </Typography>
      </Stack>
    ) : view.type === 'dayGridMonth' ? (
      <Typography
        variant="bodyMd"
        sx={(theme) => ({
          color: theme.palette.grey[500],
          textTransform: 'capitalize',
        })}
      >
        {format(date, 'EEE', {
          locale: getDateLocale(language),
        })}
      </Typography>
    ) : (
      <Stack
        direction="row"
        sx={(theme) => ({
          backgroundColor: theme.palette.blue[10],
          color: theme.palette.grey[700],
          justifyContent: 'space-between',
          p: 1,
        })}
      >
        <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
          {format(date, 'EEEE', {
            locale: getDateLocale(language),
          })}
        </Typography>
        <Typography variant="h4">
          {format(date, 'dd MMMM yyyy', {
            locale: getDateLocale(language),
          })}
        </Typography>
      </Stack>
    );

  return Content;
};
