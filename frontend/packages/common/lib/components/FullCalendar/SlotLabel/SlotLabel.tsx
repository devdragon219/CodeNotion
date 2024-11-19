import { SlotLabelContentArg } from '@fullcalendar/core/index.js';
import { Typography } from '@mui/material';

export const SlotLabel = (language: string) => {
  const Content = ({ date, view }: SlotLabelContentArg) =>
    view.type === 'dayGridMonth' ? (
      true
    ) : (
      <Typography
        variant="bodySm"
        sx={(theme) => ({
          color: theme.palette.grey[500],
          verticalAlign: 'top',
        })}
      >
        {date.toLocaleString(language, {
          hour: 'numeric',
        })}
      </Typography>
    );

  return Content;
};
