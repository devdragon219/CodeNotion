import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { add, set } from 'date-fns';

import { FullCalendar } from '../../../lib/components/FullCalendar/FullCalendar';

export const CalendarStories = () => (
  <Card>
    <CardHeader title="Calendar" />
    <CardContent>
      <Stack spacing={3}>
        <FullCalendar
          events={[
            {
              date: set(new Date(), { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 }),
              title: 'Programmata',
              type: 'recurring',
              url: '/',
            },
            {
              date: set(new Date(), { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 }),
              title: 'Condizione',
              type: 'schedule',
            },
            {
              date: set(new Date(), { hours: 11, minutes: 0, seconds: 0, milliseconds: 0 }),
              title: 'Ticket',
              type: 'report',
            },
            {
              date: set(new Date(), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }),
              title: 'Programmata',
              type: 'recurring',
            },
            {
              date: set(new Date(), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }),
              title: 'Condizione',
              type: 'schedule',
            },
            {
              date: set(new Date(), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }),
              title: 'Ticket',
              type: 'report',
            },
            {
              date: set(new Date(), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }),
              title: 'Programmata',
              type: 'recurring',
            },
            {
              date: set(new Date(), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }),
              title: 'Condizione',
              type: 'schedule',
            },
            {
              date: set(new Date(), { hours: 16, minutes: 0, seconds: 0, milliseconds: 0 }),
              title: 'Ticket',
              type: 'report',
            },
            {
              date: add(set(new Date(), { hours: 8, minutes: 0, seconds: 0, milliseconds: 0 }), { days: 1 }),
              title: 'Programmata',
              type: 'recurring',
            },
          ]}
          onDateRangeChange={({ start, end }) => {
            console.log(start, end);
          }}
          onEventClick={(event) => {
            console.log(event);
          }}
        />
      </Stack>
    </CardContent>
  </Card>
);
