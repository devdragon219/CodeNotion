import { Grid2, Skeleton, Stack } from '@mui/material';
import { DateField, SelectField } from '@realgimm5/frontend-common/components';
import { TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SORTED_TICKET_MASTER_STATUSES } from '../../../../configs/ticket';
import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetIssueTicketsCountByStatusStatisticsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { getDateRangeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getDateRangeForDashboardWidgetPeriod';
import { TicketsStatusCountStatusItem } from './StatusItem/StatusItem';

const WidgetPeriods = [
  DashboardWidgetPeriod.Month,
  DashboardWidgetPeriod.Quarter,
  DashboardWidgetPeriod.Semester,
  DashboardWidgetPeriod.Year,
  DashboardWidgetPeriod.Custom,
] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData = {
  [TicketMasterStatus.New]: 2000,
  [TicketMasterStatus.Assigned]: 400,
  [TicketMasterStatus.InProgress]: 500,
  [TicketMasterStatus.Resolved]: 100,
  [TicketMasterStatus.Completed]: 1000,
};

export const TicketsStatusCountWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Month);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [queryState] = useGetIssueTicketsCountByStatusStatisticsQuery({
    pause:
      useMockData || (period === DashboardWidgetPeriod.Custom && (customStartDate === null || customEndDate === null)),
    variables: getDateRangeForDashboardWidgetPeriod(period, customStartDate, customEndDate),
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.ticket.issuesCountByStatusStatistics;
    return {
      [TicketMasterStatus.New]: statistics?.newStatusCount ?? 0,
      [TicketMasterStatus.Assigned]: statistics?.assignedStatusCount ?? 0,
      [TicketMasterStatus.InProgress]: statistics?.inProgressStatusCount ?? 0,
      [TicketMasterStatus.Resolved]: statistics?.resolvedStatusCount ?? 0,
      [TicketMasterStatus.Completed]: statistics?.completedStatusCount ?? 0,
    };
  }, [queryState.data?.ticket.issuesCountByStatusStatistics, useMockData]);

  const handlePeriodChange = useCallback((value: WidgetPeriod | null) => {
    setPeriod(value ?? DashboardWidgetPeriod.Month);
    setCustomStartDate(null);
    setCustomEndDate(null);
  }, []);

  return queryState.fetching ? (
    <Skeleton variant="rounded" sx={{ height: '100%' }} />
  ) : (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
        <SelectField
          options={Object.values(WidgetPeriods)}
          getOptionLabel={(option) => t(`core.enum.dashboard_widget_last_period.${option}`)}
          onChange={handlePeriodChange}
          value={period}
          size="medium"
          fullWidth={false}
          useSortedOptions={false}
        />
        {period === DashboardWidgetPeriod.Custom && (
          <>
            <DateField
              label={t('component.dashboard_widget.tickets_status.start_date')}
              value={customStartDate}
              onChange={setCustomStartDate}
              size="medium"
              fullWidth={false}
              required
            />
            <DateField
              label={t('component.dashboard_widget.tickets_status.end_date')}
              value={customEndDate}
              onChange={setCustomEndDate}
              size="medium"
              fullWidth={false}
              required
            />
          </>
        )}
      </Stack>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {SORTED_TICKET_MASTER_STATUSES.map((status) => (
          <Grid2 key={status} size={{ xs: 12, sm: 2.4 }}>
            <TicketsStatusCountStatusItem status={status} value={data[status]} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
};
