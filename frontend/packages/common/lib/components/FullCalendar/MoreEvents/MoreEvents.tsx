import { Bolt, CancelTwoTone, ReportProblemOutlined, Schedule } from '@mui/icons-material';
import { Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getDateLocale } from '../../../i18n/i18n';
import { CalendarEvent } from '../FullCalendar.types';
import { MoreEventsProps } from './MoreEvents.types';

export const MoreEvents = ({ date, events, onClose }: MoreEventsProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  const title = useMemo(() => {
    const title = format(date, 'EEEE dd MMMM', {
      locale: getDateLocale(language),
    });

    return title[0].toUpperCase() + title.slice(1);
  }, [date, language]);

  const getEventIcon = useCallback(({ type, url }: CalendarEvent) => {
    switch (type) {
      case 'recurring':
        return <Schedule sx={(theme) => ({ color: url ? theme.palette.blue[500] : theme.palette.grey[400] })} />;
      case 'report':
        return <ReportProblemOutlined sx={(theme) => ({ color: theme.palette.danger[500] })} />;
      case 'schedule':
        return <Bolt sx={(theme) => ({ color: theme.palette.yellow[600] })} />;
    }
  }, []);

  const getEventDescription = useCallback(
    ({ date, title }: CalendarEvent) => [format(date, 'HH:mm'), title].join(' - '),
    [],
  );

  return (
    <Paper variant="elevation" sx={{ p: 2, width: '300px' }}>
      <Stack direction="column" gap={2}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CancelTwoTone />
          </IconButton>
        </Stack>
        <Stack direction="column" divider={<Divider />}>
          {events.map((event, index) => (
            <Stack key={index} direction="row" gap={1} sx={{ p: 1, alignItems: 'center' }}>
              {getEventIcon(event)}
              <Typography variant="caption" sx={(theme) => ({ color: theme.palette.grey[700] })}>
                {getEventDescription(event)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};
