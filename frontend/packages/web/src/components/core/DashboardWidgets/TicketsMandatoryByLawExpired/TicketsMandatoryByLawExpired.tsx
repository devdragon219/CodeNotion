import { ErrorOutline } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { parseDateToString } from '@realgimm5/frontend-common/utils';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetTicketsCountStatisticsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';

const mockData = 20000;

export const TicketsMandatoryByLawExpiredWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const [queryState] = useGetTicketsCountStatisticsQuery({
    pause: useMockData,
    variables: {
      where: {
        mainType: {
          in: [TicketMainType.ChecklistOnTriggerCondition, TicketMainType.ChecklistPreventative],
        },
        masterStatus: {
          neq: TicketMasterStatus.Completed,
        },
        dueDate: {
          lt: parseDateToString(new Date()),
        },
        isMandatoryByLaw: {
          eq: true,
        },
      },
    },
  });
  const totalCount = useMemo(() => {
    if (useMockData) return mockData;

    return queryState.data?.ticket.listTickets?.totalCount ?? 0;
  }, [queryState.data?.ticket.listTickets?.totalCount, useMockData]);

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
        px: 2,
        py: 1.5,
        borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
        background: theme.palette.danger[100],
        color: theme.palette.grey[800],
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        ':before': {
          content: '""',
          position: 'absolute',
          top: '-164px',
          right: '-187px',
          width: 305,
          height: 211,
          borderRadius: '100px',
          backgroundColor: theme.palette.danger[300],
          opacity: 0.5,
        },
        ':after': {
          zIndex: 1,
          content: '""',
          position: 'absolute',
          top: '-22px',
          right: '-246px',
          width: 305,
          height: 211,
          borderRadius: '100px',
          backgroundColor: theme.palette.danger[300],
        },
      })}
    >
      <Stack direction="row" spacing={6}>
        <Box
          sx={(theme) => ({
            alignItems: 'center',
            backgroundColor: theme.palette.danger[300],
            borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
            display: 'flex',
            py: 1.25,
            px: 1.75,
          })}
        >
          <ErrorOutline />
        </Box>
        <Stack>
          <Typography variant="h2">{totalCount}</Typography>
          <Typography variant="bodySm">
            {t('component.dashboard_widget.tickets_mandatory_by_law_expired.title')}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
