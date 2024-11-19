import { Box, Grid2 } from '@mui/material';
import { SecondaryTable, SectionTitle, SelectField, Tabs } from '@realgimm5/frontend-common/components';
import { DEFAULT_FONT } from '@realgimm5/frontend-common/configs';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { getMonthForIndex, parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

import { CostChargeAnalysisPeriod } from '../../../../../../enums/CostChargeAnalysisPeriod';
import { getCostChargeAnalysisValue } from '../../../../../../utils/costChargesAnalysis/getCostChargeAnalysisValue';
import { CostChargeAnalysisResultMonthlyGraphProps } from './MonthlyGraph.types';

export const CostChargeAnalysisResultMonthlyGraph = ({ result, type }: CostChargeAnalysisResultMonthlyGraphProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { theme } = useTheme();
  const measurementUnit = useMemo(() => result.measurementUnit, [result.measurementUnit]);
  const [period, setPeriod] = useState(CostChargeAnalysisPeriod.Total);
  const yearOptions = useMemo(() => result.perYear.map(({ key }) => key), [result.perYear]);
  const [years, setYears] = useState<number[]>(yearOptions.length !== 0 ? [yearOptions[yearOptions.length - 1]] : []);

  const handlePeriodChange = useCallback((value: CostChargeAnalysisPeriod | null) => {
    setPeriod(value ?? CostChargeAnalysisPeriod.Total);
  }, []);

  const data = useMemo(
    () =>
      result.perYear
        .filter(({ key }) => years.includes(key))
        .map(({ key, value }) => ({
          key,
          value: (value.perMonth ?? []).map(({ key, value }) => [key, getCostChargeAnalysisValue(value, type, period)]),
        })),
    [period, result.perYear, type, years],
  );

  const xaxis = useMemo(() => {
    if (data.length === 0) return undefined;
    return data[0].value.map(([key]) => getMonthForIndex(key - 1, language));
  }, [data, language]);

  const series = useMemo(
    () =>
      data.map(({ key, value }, index) => ({
        name: String(key),
        type: 'bar',
        data: value.map(([, value]) => value),
        color: theme.palette.blue[index === 0 ? 50 : index === 1 ? 200 : 500],
      })),
    [data, theme.palette.blue],
  );

  const max = useMemo(() => {
    if (series.length === 0) return null;

    const mx = Math.max(...series.flatMap(({ data }) => data));
    if (mx === 0) return null;

    const size = Math.floor(Math.log10(Math.abs(mx)));
    const magnitude = Math.pow(10, size);
    const max = Math.ceil(mx / magnitude) * magnitude;

    return max;
  }, [series]);

  const getTabRows = useCallback(
    (tab: number) => {
      const value = data.find(({ key }) => key === tab)?.value ?? [];
      const total = +value.reduce((acc, [, value]) => acc + value, 0).toFixed(2);

      return [
        ...value.map(([key, value]) => [
          getMonthForIndex(key - 1, language, 'long'),
          type === 'consumption' ? [value, measurementUnit].join(' ') : parseNumberToCurrency(value, language),
        ]),
        ...(value.length !== 0
          ? [
              [
                <Box key="total_text" sx={{ fontWeight: 700 }}>
                  {t('cost_charge_analysis.text.total')}
                </Box>,
                <Box key="total_value" sx={{ fontWeight: 700 }}>
                  {type === 'consumption' ? [total, measurementUnit].join(' ') : parseNumberToCurrency(total, language)}
                </Box>,
              ],
            ]
          : []),
      ];
    },
    [data, language, measurementUnit, t, type],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        value={`cost_charge_analysis.section_title.monthly_${type}s`}
        actions={
          <>
            <SelectField
              label={t('cost_charge_analysis.field.years')}
              multiple
              max={yearOptions.length > 3 ? 3 : undefined}
              options={yearOptions}
              onChange={setYears}
              value={years}
              size="medium"
              fullWidth={false}
            />
            <SelectField
              options={Object.values(CostChargeAnalysisPeriod)}
              getOptionLabel={(option) => t(`core.enum.cost_charge_analysis_period.${option}`)}
              onChange={handlePeriodChange}
              value={period}
              size="medium"
              fullWidth={false}
            />
          </>
        }
      />
      <Grid2 size={{ xs: 12, sm: 9 }}>
        <ReactApexChart
          type="bar"
          height="100%"
          options={{
            chart: {
              id: `cost-charge-analysis_${crypto.randomUUID()}`,
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            plotOptions: {
              bar: {
                columnWidth: `${years.length * 25}%`,
              },
            },
            tooltip: {
              followCursor: true,
              x: {
                show: false,
              },
              y: {
                formatter: (value) =>
                  type === 'consumption' ? [value, measurementUnit].join(' ') : parseNumberToCurrency(value, language),
              },
            },
            legend: {
              show: true,
              showForSingleSeries: true,
              fontFamily: `'${DEFAULT_FONT}', sans-serif`,
              position: 'bottom',
              horizontalAlign: 'center',
              itemMargin: {
                horizontal: 50,
              },
              markers: {
                offsetX: -10,
              },
            },
            grid: {
              borderColor: theme.palette.blue[10],
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
            states: {
              hover: {
                filter: {
                  type: 'darken',
                  value: 0.8,
                },
              },
            },
            stroke: {
              show: false,
            },
            xaxis: {
              categories: xaxis,
              axisBorder: {
                color: theme.palette.blue[10],
              },
              axisTicks: {
                color: theme.palette.blue[10],
                height: 5,
              },
              crosshairs: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
              labels: {
                style: {
                  colors: theme.palette.grey[500],
                },
              },
            },
            yaxis: {
              min: 0,
              stepSize: max ? Math.floor(max / 5) : undefined,
              tickAmount: 5,
              labels: {
                style: {
                  colors: theme.palette.grey[500],
                },
                formatter: (val) => val.toFixed(0),
              },
            },
          }}
          series={series}
          width="100%"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Tabs
          tabs={years.map((year) => ({
            label: String(year) as ParseKeys,
            children: (
              <SecondaryTable
                columns={[
                  'cost_charge_analysis.text.month',
                  type === 'consumption' ? 'cost_charge_analysis.text.consumption' : 'cost_charge_analysis.text.cost',
                ]}
                rows={getTabRows(year)}
              />
            ),
          }))}
        />
      </Grid2>
    </Grid2>
  );
};
