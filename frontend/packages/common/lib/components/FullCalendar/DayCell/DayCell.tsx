import { DayCellContentArg } from '@fullcalendar/core/index.js';
import { Typography } from '@mui/material';
import { format } from 'date-fns';

export const DayCell = () => {
  const Content = ({ date, view }: DayCellContentArg) =>
    view.type === 'dayGridMonth' ? (
      <Typography
        variant="h4"
        sx={(theme) => ({
          color: theme.palette.grey[700],
        })}
      >
        {format(date, 'dd')}
      </Typography>
    ) : (
      true
    );

  return Content;
};
