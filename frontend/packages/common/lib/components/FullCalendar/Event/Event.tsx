import { EventContentArg } from '@fullcalendar/core/index.js';
import { Bolt, ReportProblemOutlined, Schedule } from '@mui/icons-material';
import { Box, Divider, Stack, Theme, Typography } from '@mui/material';

import { CalendarEvent } from '../FullCalendar.types';

export const Event = (language: string) => {
  const Content = ({ event, view }: EventContentArg) => {
    const { date, type, url } = event.extendedProps as CalendarEvent;

    const getBackgroundColor = (theme: Theme) => {
      switch (type) {
        case 'recurring':
          return url ? theme.palette.blue[100] : theme.palette.grey[100];
        case 'report':
          return theme.palette.danger[100];
        case 'schedule':
          return theme.palette.yellow[100];
      }
    };

    const getBorderColor = (theme: Theme) => {
      switch (type) {
        case 'recurring':
          return url ? theme.palette.blue[500] : theme.palette.grey[400];
        case 'report':
          return theme.palette.danger[500];
        case 'schedule':
          return theme.palette.yellow[600];
      }
    };

    const getColor = (theme: Theme) => theme.palette.grey[700];

    const getIcon = () => {
      switch (type) {
        case 'recurring':
          return <Schedule />;
        case 'report':
          return <ReportProblemOutlined />;
        case 'schedule':
          return <Bolt />;
      }
    };

    return view.type === 'dayGridMonth' ? (
      <Stack
        direction="row"
        spacing={1}
        sx={(theme) => ({
          backgroundColor: getBackgroundColor(theme),
          borderRadius: '4px',
          color: getColor(theme),
          cursor: url ? 'pointer' : 'default',
          p: 0.5,
          justifyContent: 'space-between',
          width: '100%',
        })}
      >
        <Typography variant="bodyMd" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {event.title}
        </Typography>
        {getIcon()}
      </Stack>
    ) : (
      <Box
        sx={(theme) => ({
          backgroundColor: getBackgroundColor(theme),
          borderRadius: '4px',
          color: getColor(theme),
          cursor: url ? 'pointer' : 'default',
          height: '100%',
          p: 1,
          position: 'relative',
        })}
      >
        <Divider
          orientation="vertical"
          sx={(theme) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '3px',
            backgroundColor: getBorderColor(theme),
            border: 'none',
            borderRadius: '4px 0 0 4px',
          })}
        />
        <Stack direction="column">
          <Stack direction="row" spacing={0.1} sx={{ alignItems: 'center' }}>
            <Typography variant="bodySm">
              {date.toLocaleString(language, { hour: '2-digit', minute: '2-digit' })}
            </Typography>
            {getIcon()}
          </Stack>
          <Typography variant="bodySm">{event.title}</Typography>
        </Stack>
      </Box>
    );
  };

  return Content;
};
