import { Box, Typography } from '@mui/material';
import {
  DashboardChart,
  DashboardWidgetContainer,
  EmptyText,
  SelectField,
} from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetChecklistTicketsMandatoryByLawStatusStatisticsQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { getDateRangeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getDateRangeForDashboardWidgetPeriod';

const WidgetPeriods = [
  DashboardWidgetPeriod.Month,
  DashboardWidgetPeriod.Quarter,
  DashboardWidgetPeriod.Semester,
  DashboardWidgetPeriod.Year,
] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData = {
  donePercentage: 60,
  expiredPercentage: 30,
  scheduledPercentage: 10,
};

export const TicketsMandatoryByLawStatusPercentageWidget = ({ useMockData }: DashboardWidgetProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Month);
  const [queryState] = useGetChecklistTicketsMandatoryByLawStatusStatisticsQuery({
    pause: useMockData,
    variables: getDateRangeForDashboardWidgetPeriod(period),
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.ticket.mandatoryByLawChecklistTicketsStatusStatistics;
    return {
      donePercentage: statistics?.donePercentage ?? 0,
      expiredPercentage: statistics?.expiredPercentage ?? 0,
      scheduledPercentage: statistics?.scheduledPercentage ?? 0,
    };
  }, [queryState.data?.ticket.mandatoryByLawChecklistTicketsStatusStatistics, useMockData]);

  const colors = useMemo(() => [theme.palette.blue[50], theme.palette.blue[200], theme.palette.blue[500]], [theme]);

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
          {t('component.dashboard_widget.tickets_mandatory_by_law_status_percentage.title')}
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

      {Object.keys(data).length === 0 ? (
        <Box sx={{ px: 2 }}>
          <EmptyText value="core.text.no_data" useGrid={false} />
        </Box>
      ) : (
        <DashboardChart
          type="pie"
          colors={colors}
          labels={[
            t('component.dashboard_widget.tickets_mandatory_by_law_status_percentage.tickets_done'),
            t('component.dashboard_widget.tickets_mandatory_by_law_status_percentage.tickets_expired'),
            t('component.dashboard_widget.tickets_mandatory_by_law_status_percentage.tickets_scheduled'),
          ]}
          series={Object.values(data)}
        />
      )}
    </DashboardWidgetContainer>
  );
};
