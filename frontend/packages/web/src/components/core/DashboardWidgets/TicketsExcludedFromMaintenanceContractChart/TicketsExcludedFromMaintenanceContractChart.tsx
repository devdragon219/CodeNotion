import { Box, Stack, Typography } from '@mui/material';
import {
  DashboardChart,
  DashboardWidgetContainer,
  DateField,
  EmptyText,
  SelectField,
} from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { LineChartType } from '@realgimm5/frontend-common/gql/types';
import { getDateLocale } from '@realgimm5/frontend-common/i18n';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { getMonthForIndex, parseStringToDate } from '@realgimm5/frontend-common/utils';
import { format } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { IssuesExcludedFromMaintenanceContractLineChartDataPointFragment } from '../../../../gql/RealGimm.Web.IssuesExcludedFromMaintenanceContractLineChartDataPoint.fragment';
import { useGetIssueTicketsExcludedFromMaintenanceContractLineChartQuery } from '../../../../gql/RealGimm.Web.Ticket.operation';
import { getDateRangeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getDateRangeForDashboardWidgetPeriod';
import { getLineChartTypeForDashboardWidgetPeriod } from '../../../../utils/components/dashboardBuilder/getLineChartTypeForDashboardWidgetPeriod';

const WidgetPeriods = [
  DashboardWidgetPeriod.Week,
  DashboardWidgetPeriod.BiWeek,
  DashboardWidgetPeriod.QuarterPerDay,
  DashboardWidgetPeriod.QuarterPerWeek,
  DashboardWidgetPeriod.YearPerWeek,
  DashboardWidgetPeriod.YearPerMonth,
  DashboardWidgetPeriod.Custom,
] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData = {
  dates: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  excluded: [80, 95, 90, 65, 110, 140, 180, 200, 100, 90, 180, 140],
  nonExcluded: [310, 185, 120, 170, 220, 260, 200, 260, 290, 280, 320, 110],
};

export const TicketsExcludedFromMaintenanceContractChartWidget = ({ useMockData }: DashboardWidgetProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { theme } = useTheme();
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Week);
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [customChartType, setCustomChartType] = useState(LineChartType.Daily);
  const [queryState] = useGetIssueTicketsExcludedFromMaintenanceContractLineChartQuery({
    pause:
      useMockData || (period === DashboardWidgetPeriod.Custom && (customStartDate === null || customEndDate === null)),
    variables: {
      ...getDateRangeForDashboardWidgetPeriod(period, customStartDate, customEndDate),
      chartType: getLineChartTypeForDashboardWidgetPeriod(period, customChartType),
    },
  });

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const parseDataPoints = (
      dataPoints: { dataPoint: IssuesExcludedFromMaintenanceContractLineChartDataPointFragment }[],
    ) => ({
      excluded: dataPoints.map(({ dataPoint }) => dataPoint.excludedCount),
      nonExcluded: dataPoints.map(({ dataPoint }) => dataPoint.nonExcludedCount),
    });

    const statistics = queryState.data?.ticket.issuesExcludedFromMaintenanceContractLineChart;
    switch (period) {
      case DashboardWidgetPeriod.Week:
      case DashboardWidgetPeriod.BiWeek:
      case DashboardWidgetPeriod.QuarterPerDay:
        return {
          dates:
            statistics?.daily?.map((it) =>
              format(parseStringToDate(it.date)!, 'dd MMM', {
                locale: getDateLocale(language),
              }),
            ) ?? [],
          ...parseDataPoints(statistics?.daily ?? []),
        };
      case DashboardWidgetPeriod.QuarterPerWeek:
      case DashboardWidgetPeriod.YearPerWeek:
        return {
          dates: statistics?.weekly?.map(({ week }) => `${week}`) ?? [],
          ...parseDataPoints(statistics?.weekly ?? []),
        };
      case DashboardWidgetPeriod.YearPerMonth:
        return {
          dates: statistics?.monthly?.map(({ month }) => getMonthForIndex(month - 1, language) ?? `${month}`) ?? [],
          ...parseDataPoints(statistics?.monthly ?? []),
        };
      case DashboardWidgetPeriod.Custom: {
        switch (customChartType) {
          case LineChartType.Daily:
            return {
              dates:
                statistics?.daily?.map((it) =>
                  format(parseStringToDate(it.date)!, 'dd MMM', {
                    locale: getDateLocale(language),
                  }),
                ) ?? [],
              ...parseDataPoints(statistics?.daily ?? []),
            };
          case LineChartType.Weekly:
            return {
              dates: statistics?.weekly?.map(({ week }) => `${week}`) ?? [],
              ...parseDataPoints(statistics?.weekly ?? []),
            };
          case LineChartType.Monthly:
            return {
              dates: statistics?.monthly?.map(({ month }) => getMonthForIndex(month - 1, language) ?? `${month}`) ?? [],
              ...parseDataPoints(statistics?.monthly ?? []),
            };
        }
      }
    }
  }, [
    customChartType,
    language,
    period,
    queryState.data?.ticket.issuesExcludedFromMaintenanceContractLineChart,
    useMockData,
  ]);

  const handlePeriodChange = useCallback((value: WidgetPeriod | null) => {
    setPeriod(value ?? DashboardWidgetPeriod.Week);
    setCustomStartDate(null);
    setCustomEndDate(null);
    setCustomChartType(LineChartType.Daily);
  }, []);

  const handleCustomChartTypeChange = useCallback((value: LineChartType | null) => {
    setCustomChartType(value ?? LineChartType.Daily);
  }, []);

  return (
    <DashboardWidgetContainer isLoading={queryState.fetching} useBoxShadow={false}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', px: 2 }}>
        <Typography variant="h4" sx={(theme) => ({ color: theme.palette.grey[700] })}>
          {t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.title.default')}
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
                label={t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.start_date')}
                value={customStartDate}
                onChange={setCustomStartDate}
                size="medium"
                fullWidth={false}
                required
              />
              <DateField
                label={t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.end_date')}
                value={customEndDate}
                onChange={setCustomEndDate}
                size="medium"
                fullWidth={false}
                required
              />
              <SelectField
                label={t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.chart_type')}
                options={Object.values(LineChartType)}
                getOptionLabel={(option) => t(`common.enum.line_chart_type.${option}`)}
                onChange={handleCustomChartTypeChange}
                value={customChartType}
                size="medium"
                fullWidth={false}
                useSortedOptions={false}
              />
            </>
          )}
        </Stack>
      </Stack>

      <Box sx={{ px: 2 }}>
        {data.dates.length === 0 ? (
          <EmptyText value="core.text.no_data" useGrid={false} />
        ) : (
          <DashboardChart
            type="line"
            series={[data.nonExcluded, data.excluded].map((data, i) => ({
              name:
                i === 0
                  ? t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.non_excluded')
                  : t('component.dashboard_widget.tickets_excluded_from_maintenance_contract.excluded'),
              data,
              color: i === 0 ? theme.palette.blue[500] : theme.palette.grey[700],
            }))}
            xaxis={data.dates}
          />
        )}
      </Box>
    </DashboardWidgetContainer>
  );
};
