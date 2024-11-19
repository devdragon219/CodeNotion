import { Box, Typography } from '@mui/material';
import { DashboardChart, DashboardWidgetContainer, SelectField } from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';
import { getMonthForIndex, parseStringToDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DashboardWidgetPeriod } from '../../../../enums/DashboardWidgetPeriod';
import { useGetEstateOccupationStatisticsQuery } from '../../../../gql/RealGimm.Web.Estate.operation';

const WidgetPeriods = [DashboardWidgetPeriod.Month, DashboardWidgetPeriod.Year] as const;
type WidgetPeriod = (typeof WidgetPeriods)[number];

const mockData = {
  [DashboardWidgetPeriod.Month]: {
    average: [
      75, 85, 80, 70, 120, 150, 200, 160, 90, 80, 120, 110, 90, 100, 110, 70, 80, 85, 120, 90, 80, 80, 75, 100, 90, 140,
      80, 85, 90, 100,
    ],
    total: [
      290, 180, 140, 180, 240, 240, 180, 240, 260, 240, 240, 140, 280, 210, 190, 180, 200, 190, 230, 220, 210, 200, 180,
      200, 190, 250, 260, 230, 180, 200,
    ],
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
  },
  [DashboardWidgetPeriod.Year]: {
    average: [80, 95, 90, 65, 110, 140, 180, 200, 100, 90, 180, 140],
    total: [310, 185, 120, 170, 220, 260, 200, 260, 290, 280, 320, 110],
    months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  percentageIncreaseComparedToLastYear: 0.3,
  percentageIncreaseComparedToTwoYears: 0.6,
};

export const EstateOccupationStatusPercentageWidget = ({ useMockData }: DashboardWidgetProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { theme } = useTheme();
  const [queryState] = useGetEstateOccupationStatisticsQuery({ pause: useMockData });
  const [period, setPeriod] = useState<WidgetPeriod>(DashboardWidgetPeriod.Month);

  const data = useMemo(() => {
    if (useMockData) return mockData;

    const statistics = queryState.data?.estate.occupationStatistics;
    return {
      [DashboardWidgetPeriod.Month]: {
        average: statistics?.lastMonth.map((el) => el.averageTotalOccupiedEstatesCount) ?? [],
        total: statistics?.lastMonth.map((el) => el.totalOccupiedEstatesCount) ?? [],
        days: statistics?.lastMonth.map((el) => parseStringToDate(el.date)!.getDate()),
      },
      [DashboardWidgetPeriod.Year]: {
        average: statistics?.lastYear.map((el) => el.averageTotalOccupiedEstatesCount) ?? [],
        total: statistics?.lastYear.map((el) => el.totalOccupiedEstatesCount) ?? [],
        months: statistics?.lastYear.map((el) => el.month),
      },
      percentageIncreaseComparedToLastYear: statistics?.percentageIncreaseComparedToLastYear,
      percentageIncreaseComparedToTwoYears: statistics?.percentageIncreaseComparedToTwoYears,
    };
  }, [queryState.data?.estate.occupationStatistics, useMockData]);

  const handlePeriodChange = useCallback((value: WidgetPeriod | null) => {
    setPeriod(value ?? DashboardWidgetPeriod.Month);
  }, []);

  const lastYearIncrease = useMemo(
    () =>
      data.percentageIncreaseComparedToLastYear
        ? `${data.percentageIncreaseComparedToLastYear > 0 ? '+' : ''}${data.percentageIncreaseComparedToLastYear * 100}%`
        : '-',
    [data.percentageIncreaseComparedToLastYear],
  );
  const twoYearsIncrease = useMemo(
    () =>
      data.percentageIncreaseComparedToTwoYears
        ? `${data.percentageIncreaseComparedToTwoYears > 0 ? '+' : ''}${data.percentageIncreaseComparedToTwoYears * 100}%`
        : '-',
    [data.percentageIncreaseComparedToTwoYears],
  );

  const xaxis = useMemo(
    () =>
      period === DashboardWidgetPeriod.Month
        ? (data[period].days?.map((day) => `${day}`) ?? [])
        : (data[period].months?.map((month) => getMonthForIndex(month, language)!) ?? []),
    [data, language, period],
  );

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
          {t('component.dashboard_widget.estate_occupation_status_percentage.title')}
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

      <Box sx={{ display: 'flex', gap: 2.5, px: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
          <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
            {lastYearIncrease}
          </Typography>
          <Typography variant="bodyLg" sx={(theme) => ({ color: theme.palette.grey[700] })}>
            {t('component.dashboard_widget.estate_occupation_status_percentage.last_year_increase')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
          <Typography variant="h3" sx={(theme) => ({ color: theme.palette.grey[700] })}>
            {twoYearsIncrease}
          </Typography>
          <Typography variant="bodyLg" sx={(theme) => ({ color: theme.palette.grey[700] })}>
            {t('component.dashboard_widget.estate_occupation_status_percentage.two_years_increase')}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 2 }}>
        <DashboardChart
          type="line"
          annotations={{
            points: data[period].average.map((y, x) => ({
              x: getMonthForIndex(x, language),
              y,
              marker: {
                size: 6,
                radius: 2,
                strokeColor: theme.palette.blue[500],
                strokeWidth: 2,
                fillColor: theme.palette.background.default,
              },
            })),
          }}
          fill={{
            type: ['solid', 'gradient'],
            gradient: {
              inverseColors: false,
              type: 'vertical',
              shade: 'light',
              shadeIntensity: 1,
              opacityFrom: 0.5,
              opacityTo: 0.2,
              stops: [0, 100],
            },
          }}
          legend={false}
          plotOptions={{
            bar: {
              borderRadius: 8,
              columnWidth: 15,
            },
          }}
          series={[data[period].total, data[period].average].map((data, i) => ({
            name:
              i === 0
                ? t('component.dashboard_widget.estate_occupation_status_percentage.total')
                : t('component.dashboard_widget.estate_occupation_status_percentage.average'),
            type: i === 0 ? 'column' : 'area',
            data,
            color: i === 0 ? theme.palette.yellow[600] : theme.palette.blue[500],
          }))}
          stroke={{
            curve: 'smooth',
            width: [0, 3],
          }}
          xaxis={xaxis}
        />
      </Box>
    </DashboardWidgetContainer>
  );
};
