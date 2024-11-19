import { MoreLinkContentArg } from '@fullcalendar/core/index.js';
import { Box, Divider, Typography } from '@mui/material';
import { TFunction } from 'i18next';

export const MoreLink = (t: TFunction) => {
  const Content = ({ num, view }: MoreLinkContentArg) => (
    <Box
      sx={(theme) => ({
        alignItems: 'center',
        backgroundColor: view.type === 'dayGridMonth' ? 'transparent' : theme.palette.background.paper,
        borderRadius: '4px',
        display: 'flex',
        height: '100%',
        p: view.type === 'dayGridMonth' ? 0.5 : 1,
        position: 'relative',
        width: '100%',
      })}
    >
      {view.type !== 'dayGridMonth' && (
        <Divider
          orientation="vertical"
          sx={(theme) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '3px',
            backgroundColor: theme.palette.grey[50],
            border: 'none',
            borderRadius: '4px 0 0 4px',
          })}
        />
      )}
      <Typography variant="bodyMd" sx={(theme) => ({ color: theme.palette.blue[500] })}>
        {t('common.component.calendar.more_link', { num })}
      </Typography>
    </Box>
  );

  return Content;
};
