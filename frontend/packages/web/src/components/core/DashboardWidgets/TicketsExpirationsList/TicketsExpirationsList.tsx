import { ChevronRight } from '@mui/icons-material';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { DashboardWidgetContainer } from '@realgimm5/frontend-common/components';
import { SortEnumType, TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString, parseStringToDate } from '@realgimm5/frontend-common/utils';
import { differenceInDays } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useGetTicketsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { TicketItem } from './TicketItem/TicketItem';
import { TicketsExpirationsListWidgetProps } from './TicketsExpirationsList.types';

const mockData = [
  {
    ticketId: 1,
    internalCode: '1234',
    description: 'Descrizione ticket',
    daysToExpiration: -2,
  },
  {
    ticketId: 2,
    internalCode: '1234',
    description: 'Descrizione ticket',
    daysToExpiration: -2,
  },
  {
    ticketId: 3,
    internalCode: '1234',
    description: 'Descrizione ticket',
    daysToExpiration: 20,
  },
  {
    ticketId: 4,
    internalCode: '1234',
    description: 'Descrizione ticket',
    daysToExpiration: 22,
  },
  {
    ticketId: 5,
    internalCode: '1234',
    description: 'Descrizione ticket',
    daysToExpiration: 32,
  },
];

export const TicketsExpirationsListWidget = ({
  isIssue,
  isMandatoryByLaw,
  useBoxShadow,
  useMockData,
}: TicketsExpirationsListWidgetProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [queryState] = useGetTicketsQuery({
    pause: useMockData,
    variables: {
      first: 5,
      order: {
        dueDate: SortEnumType.Desc,
      },
      where: {
        mainType: {
          in: isIssue
            ? [TicketMainType.Issue]
            : [TicketMainType.ChecklistOnTriggerCondition, TicketMainType.ChecklistPreventative],
        },
        masterStatus: {
          neq: TicketMasterStatus.Completed,
        },
        dueDate: {
          lt: parseDateToString(new Date()),
        },
        ...(isMandatoryByLaw
          ? {
              isMandatoryByLaw: {
                eq: true,
              },
            }
          : {}),
      },
    },
  });

  const data = useMemo(
    () =>
      useMockData
        ? mockData
        : (queryState.data?.ticket.listTickets?.nodes?.map((ticket) => ({
            ticketId: ticket.id,
            internalCode: ticket.internalCode,
            description: ticket.description ?? '',
            daysToExpiration: differenceInDays(new Date(), parseStringToDate(ticket.dueDate) ?? new Date()),
          })) ?? []),
    [queryState.data?.ticket.listTickets?.nodes, useMockData],
  );

  const handleViewAll = useCallback(() => {
    if (useMockData) return;
    navigate('/app/maintenance/tickets/');
  }, [navigate, useMockData]);

  return (
    <DashboardWidgetContainer isLoading={queryState.fetching} useBoxShadow={useBoxShadow}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', px: 2 }}>
        <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t(
            `component.dashboard_widget.tickets_expirations_list.title.${isIssue ? 'issue' : isMandatoryByLaw ? 'mandatory_by_law' : 'checklist'}`,
          )}
        </Typography>
        <Stack divider={<Divider flexItem />} spacing={1}>
          {data.map((ticket) => (
            <TicketItem key={ticket.ticketId} ticket={ticket} useMockData={useMockData} />
          ))}
        </Stack>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
        <Typography
          variant="link"
          sx={{ textAlign: 'center', alignItems: 'flex-end', display: 'flex' }}
          onClick={handleViewAll}
        >
          {t('component.dashboard_widget.tickets_expirations_list.view_all')}
          <ChevronRight
            sx={{
              width: '16px',
            }}
          />
        </Typography>
      </Box>
    </DashboardWidgetContainer>
  );
};
