import { Box, Typography } from '@mui/material';
import { DashboardChart, DashboardWidgetContainer, SelectField } from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { getDateRangeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getDateRangeForDashboardWidgetPeriod';

const WidgetPeriods = [
  DashboardWidgetPeriod.Month,
  DashboardWidgetPeriod.Quarter,
  DashboardWidgetPeriod.Semester,
  DashboardWidgetPeriod.Year,
] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData = {
  excludedAmountPercentage: 25,
  nonExcludedAmountPercentage: 75,
};

export const TicketsExcludedFromMaintenanceContractExpensesPercentageWidget = ({
  useMockData,
}: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Month);
  const [queryState] = useGetTicketsExcludedFromMaintenanceContractExpensesPercentageStatisticsQuery({
    pause: useMockData,
    variables: getDateRangeForDashboardWidgetPeriod(period),
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.ticket.ticketAmountPercentageByIsExcludedFromMaintenanceContractStatistics;
    return {
      excludedAmountPercentage: statistics?.excludedAmountPercentage ?? 0,
      nonExcludedAmountPercentage: statistics?.nonExcludedAmountPercentage ?? 0,
    };
  }, [queryState.data?.ticket.ticketAmountPercentageByIsExcludedFromMaintenanceContractStatistics, useMockData]);

  const labels = useMemo(
    () => [
      t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.non_excluded'),
      t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.excluded'),
    ],
    [t],
  );
  const colors = useMemo(() => [theme.palette.green[700], theme.palette.yellow[500]], [theme]);

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
          {t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.title.expenses')}
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

      <DashboardChart type="donut" colors={colors} labels={labels} series={Object.values(data)} />
    </DashboardWidgetContainer>
  );
};
