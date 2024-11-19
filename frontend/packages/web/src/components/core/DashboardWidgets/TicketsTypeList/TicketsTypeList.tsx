import { Box, Typography } from '@mui/material';
import { DashboardWidgetContainer, SecondaryTable, SelectField } from '@realgimm5/frontend-common/components';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetIssueTicketsPercentageByTypeStatisticsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { getDateRangeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getDateRangeForDashboardWidgetPeriod';

const WidgetPeriods = [
  DashboardWidgetPeriod.Month,
  DashboardWidgetPeriod.Quarter,
  DashboardWidgetPeriod.Semester,
  DashboardWidgetPeriod.Year,
] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData = [
  ['Tipologia 1', 50],
  ['Tipologia 2', 50],
];

export const TicketsTypeListWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Month);
  const [queryState] = useGetIssueTicketsPercentageByTypeStatisticsQuery({
    pause: useMockData,
    variables: getDateRangeForDashboardWidgetPeriod(period),
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.ticket.issuesPercentageByTypeStatistics;
    return statistics?.map(({ key, value }) => [key.description, value]) ?? [];
  }, [queryState.data?.ticket.issuesPercentageByTypeStatistics, useMockData]);

  const handlePeriodChange = useCallback((value: WidgetPeriod | null) => {
    setPeriod(value ?? DashboardWidgetPeriod.Month);
  }, []);

  return (
    <DashboardWidgetContainer
      isLoading={queryState.fetching}
      useBoxShadow={false}
      sx={{
        justifyContent: 'flex-start',
      }}
    >
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
          {t('component.dashboard_widget.tickets_type_list.title')}
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
      <Box sx={{ display: 'flex', justifyContent: 'center', maxHeight: '500px', px: 2 }}>
        <SecondaryTable
          columns={['component.dashboard_widget.tickets_type_list.type', '%' as ParseKeys]}
          rows={data}
          sx={{ tableLayout: 'fixed' }}
        />
      </Box>
    </DashboardWidgetContainer>
  );
};
