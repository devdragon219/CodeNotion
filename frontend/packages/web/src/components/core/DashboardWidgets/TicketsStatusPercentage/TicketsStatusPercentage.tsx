import { Box, Typography } from '@mui/material';
import { DashboardChart, DashboardWidgetContainer, SelectField } from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetIssueTicketsPercentageByStatusStatisticsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { getDateRangeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getDateRangeForDashboardWidgetPeriod';

const WidgetPeriods = [
  DashboardWidgetPeriod.Month,
  DashboardWidgetPeriod.Quarter,
  DashboardWidgetPeriod.Semester,
  DashboardWidgetPeriod.Year,
] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData = {
  ['status_new']: 0,
  ['status_assigned']: 10,
  ['status_in_progress']: 30,
  ['status_resolved']: 10,
  ['status_completed']: 50,
};

export const TicketsStatusPercentageWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Month);
  const [queryState] = useGetIssueTicketsPercentageByStatusStatisticsQuery({
    pause: useMockData,
    variables: getDateRangeForDashboardWidgetPeriod(period),
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.ticket.issuesPercentageByStatusStatistics;
    return {
      ['status_new']: statistics?.newStatusPercentage ?? 0,
      ['status_assigned']: statistics?.assignedStatusPercentage ?? 0,
      ['status_in_progress']: statistics?.inProgressStatusPercentage ?? 0,
      ['status_resolved']: statistics?.resolvedStatusPercentage ?? 0,
      ['status_completed']: statistics?.completedStatusPercentage ?? 0,
    };
  }, [queryState.data?.ticket.issuesPercentageByStatusStatistics, useMockData]);

  const colors = useMemo(
    () => [
      theme.palette.blue[10]!,
      theme.palette.blue[50],
      theme.palette.blue[100],
      theme.palette.blue[200],
      theme.palette.blue[500],
    ],
    [theme],
  );

  const handlePeriodChange = useCallback((value: WidgetPeriod | null) => {
    setPeriod(value ?? DashboardWidgetPeriod.Month);
  }, []);

  return (
    <DashboardWidgetContainer isLoading={queryState.fetching} useBoxShadow={false}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          px: 2,
        }}
      >
        <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t('component.dashboard_widget.tickets_status.title.count')}
        </Typography>
        <SelectField
          variant="standard"
          options={Object.values(WidgetPeriods)}
          getOptionLabel={(option) => t(`core.enum.dashboard_widget_last_period.${option}`)}
          onChange={handlePeriodChange}
          value={period}
          size="small"
          fullWidth={false}
          useSortedOptions={false}
        />
      </Box>

      <DashboardChart
        type="pie"
        colors={colors}
        labels={Object.keys(data).map((option) =>
          t(`component.dashboard_widget.tickets_status.${option}` as ParseKeys),
        )}
        series={Object.values(data)}
      />
    </DashboardWidgetContainer>
  );
};
