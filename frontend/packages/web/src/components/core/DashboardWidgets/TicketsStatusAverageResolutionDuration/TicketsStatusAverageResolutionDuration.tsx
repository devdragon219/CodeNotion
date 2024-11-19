import { Grid2, Skeleton, Stack, Typography } from '@mui/material';
import { DateField, SelectField } from '@realgimm5/frontend-common/components';
import { TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { parseStringToDuration } from '@realgimm5/frontend-common/utils';
import { Duration } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SORTED_TICKET_MASTER_STATUSES } from '../../../../configs/ticket';
import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetIssueTicketsAverageResolutionDurationByStatusStatisticsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { getDateRangeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getDateRangeForDashboardWidgetPeriod';
import { TicketsStatusAverageResolutionDurationStatusItem } from './StatusItem/StatusItem';

const WidgetPeriods = [
  DashboardWidgetPeriod.Month,
  DashboardWidgetPeriod.Quarter,
  DashboardWidgetPeriod.Semester,
  DashboardWidgetPeriod.Year,
  DashboardWidgetPeriod.Custom,
] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData: Record<TicketMasterStatus, Duration> = {
  [TicketMasterStatus.New]: {
    days: 1,
    hours: 2,
  },
  [TicketMasterStatus.Assigned]: {
    days: 3,
    hours: 5,
  },
  [TicketMasterStatus.InProgress]: {
    days: 2,
  },
  [TicketMasterStatus.Resolved]: {
    days: 5,
    hours: 4,
  },
  [TicketMasterStatus.Completed]: {
    days: 5,
  },
};

export const TicketsStatusAverageResolutionDurationWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Month);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [queryState] = useGetIssueTicketsAverageResolutionDurationByStatusStatisticsQuery({
    pause:
      useMockData || (period === DashboardWidgetPeriod.Custom && (customStartDate === null || customEndDate === null)),
    variables: getDateRangeForDashboardWidgetPeriod(period, customStartDate, customEndDate),
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.ticket.issuesAverageResolutionDurationByStatusStatistics;
    return {
      [TicketMasterStatus.New]: parseStringToDuration(statistics?.newDuration),
      [TicketMasterStatus.Assigned]: parseStringToDuration(statistics?.assignedDuration),
      [TicketMasterStatus.InProgress]: parseStringToDuration(statistics?.inProgressDuration),
      [TicketMasterStatus.Resolved]: parseStringToDuration(statistics?.resolvedDuration),
      [TicketMasterStatus.Completed]: parseStringToDuration(statistics?.completedDuration),
    };
  }, [queryState.data?.ticket.issuesAverageResolutionDurationByStatusStatistics, useMockData]);

  const handlePeriodChange = useCallback((value: WidgetPeriod | null) => {
    setPeriod(value ?? DashboardWidgetPeriod.Month);
    setCustomStartDate(null);
    setCustomEndDate(null);
  }, []);

  return queryState.fetching ? (
    <Skeleton variant="rounded" sx={{ height: '100%' }} />
  ) : (
    <Stack direction="column" spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t('component.dashboard_widget.tickets_status.title.average')}
        </Typography>
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
      </Stack>

      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        {SORTED_TICKET_MASTER_STATUSES.map((status) => (
          <Grid2 key={status} size={{ xs: 12, sm: 2.4 }}>
            <TicketsStatusAverageResolutionDurationStatusItem status={status} value={data[status]} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
};
