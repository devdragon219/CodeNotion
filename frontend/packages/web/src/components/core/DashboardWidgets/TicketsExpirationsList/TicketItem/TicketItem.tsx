import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { TicketItemProps } from './TicketItem.types';

export const TicketItem = ({ ticket, useMockData }: TicketItemProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (ticketId: number) => () => {
      if (useMockData) return;
      navigate(`/app/maintenance/tickets/${ticketId}`);
    },
    [navigate, useMockData],
  );

  return (
    <Box
      sx={(theme) => ({
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
        p: '12px',
        color: theme.palette.grey[700],
        ...(ticket.daysToExpiration >= 0 && {
          border: `1px solid ${theme.palette.danger[500]}`,
          color: theme.palette.danger[500],
        }),
      })}
      onClick={handleClick(ticket.ticketId)}
    >
      <Typography variant="bodyMd">{`${ticket.internalCode} - ${ticket.description}`}</Typography>
      <Typography
        variant="bodyMd"
        sx={(theme) => ({
          color: theme.palette.danger[500],
          minWidth: '60px',
          textAlign: 'right',
        })}
      >
        {ticket.daysToExpiration > 0 ? '+' : ''}
        {ticket.daysToExpiration} {t('core.text.days')}
      </Typography>
    </Box>
  );
};
