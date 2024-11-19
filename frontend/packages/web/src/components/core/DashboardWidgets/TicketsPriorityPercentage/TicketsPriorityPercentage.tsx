import { Box, Typography } from '@mui/material';
import { DashboardChart, DashboardWidgetContainer, SelectField } from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { Priority } from '@realgimm5/frontend-common/gql/types';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetIssueTicketsPercentageByPriorityStatisticsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { getDateRangeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getDateRangeForDashboardWidgetPeriod';

const WidgetPeriods = [
  DashboardWidgetPeriod.Month,
  DashboardWidgetPeriod.Quarter,
  DashboardWidgetPeriod.Semester,
  DashboardWidgetPeriod.Year,
] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData = {
  [Priority.Critical]: 0,
  [Priority.Major]: 60,
  [Priority.Normal]: 30,
  [Priority.Minor]: 10,
};

export const TicketsPriorityPercentageWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Month);
  const [queryState] = useGetIssueTicketsPercentageByPriorityStatisticsQuery({
    pause: useMockData,
    variables: getDateRangeForDashboardWidgetPeriod(period),
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.ticket.issuesPercentageByPriorityStatistics;
    return {
      [Priority.Critical]: statistics?.criticalStatusPercentage ?? 0,
      [Priority.Major]: statistics?.majorStatusPercentage ?? 0,
      [Priority.Normal]: statistics?.normalStatusPercentage ?? 0,
      [Priority.Minor]: statistics?.minorStatusPercentage ?? 0,
    };
  }, [queryState.data?.ticket.issuesPercentageByPriorityStatistics, useMockData]);

  const colors = useMemo(
    () => [theme.palette.blue[10]!, theme.palette.blue[50], theme.palette.blue[200], theme.palette.blue[500]],
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
          {t('component.dashboard_widget.tickets_priority_percentage.title')}
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
        labels={Object.keys(data).map((option) => t(`common.enum.priority.${option as Priority}`))}
        series={Object.values(data)}
      />
    </DashboardWidgetContainer>
  );
};
