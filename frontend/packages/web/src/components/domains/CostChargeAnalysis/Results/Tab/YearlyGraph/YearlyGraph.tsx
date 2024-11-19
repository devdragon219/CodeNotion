import { Box, Grid2 } from '@mui/material';
import { SecondaryTable, SectionTitle, SelectField } from '@realgimm5/frontend-common/components';
import { useTheme } from '@realgimm5/frontend-common/contexts';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

import { CostChargeAnalysisPeriod } from '../../../../../../enums/CostChargeAnalysisPeriod';
import { getCostChargeAnalysisValue } from '../../../../../../utils/costChargesAnalysis/getCostChargeAnalysisValue';
import { CostChargeAnalysisResultYearlyGraphProps } from './YearlyGraph.types';

export const CostChargeAnalysisResultYearlyGraph = ({ result, type }: CostChargeAnalysisResultYearlyGraphProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { theme } = useTheme();
  const measurementUnit = useMemo(() => result.measurementUnit, [result.measurementUnit]);
  const yearOptions = useMemo(() => result.perYear.map(({ key }) => key), [result.perYear]);
  const [fromYear, setFromYear] = useState(
    yearOptions.length !== 0 ? yearOptions[Math.max(yearOptions.length - 10, 0)] : null,
  );
  const [toYear, setToYear] = useState(yearOptions.length !== 0 ? yearOptions[yearOptions.length - 1] : null);
  const [period, setPeriod] = useState(CostChargeAnalysisPeriod.Total);

  const handleFromYearChange = useCallback(
    (value: number | null) => {
      setFromYear(value);
      if (value && toYear && (value > toYear || value <= toYear - 10)) {
        setToYear(value + 9);
      }
    },
    [toYear],
  );

  const handleToYearChange = useCallback(
    (value: number | null) => {
      setToYear(value);
      if (value && fromYear && (value < fromYear || value >= fromYear + 10)) {
        setFromYear(value - 9);
      }
    },
    [fromYear],
  );

  const handlePeriodChange = useCallback((value: CostChargeAnalysisPeriod | null) => {
    setPeriod(value ?? CostChargeAnalysisPeriod.Total);
  }, []);

  const data = useMemo(
    () =>
      result.perYear
        .filter(({ key }) => (!fromYear || key >= fromYear) && (!toYear || key <= toYear))
        .map(({ key, value: { value } }) => [key, getCostChargeAnalysisValue(value, type, period)]),
    [fromYear, period, result.perYear, toYear, type],
  );

  const xaxis = useMemo(() => data.map(([key]) => key), [data]);

  const series = useMemo(() => data.map(([, value]) => value), [data]);

  const max = useMemo(() => {
    if (series.length === 0) return null;

    const mx = Math.max(...series);
    if (mx === 0) return null;

    const size = Math.floor(Math.log10(Math.abs(mx)));
    const magnitude = Math.pow(10, size);
    const max = Math.ceil(mx / magnitude) * magnitude;

    return max;
  }, [series]);

  const rows = useMemo(() => {
    const total = +data.reduce((acc, [, value]) => acc + value, 0).toFixed(2);

    return [
      ...data.map(([key, value]) => [
        key,
        type === 'consumption' ? [value, measurementUnit].join(' ') : parseNumberToCurrency(value, language),
      ]),
      ...(data.length !== 0
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
  }, [data, language, measurementUnit, t, type]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        value={`cost_charge_analysis.section_title.yearly_${type}s`}
        actions={
          <>
            <SelectField
              label={t('cost_charge_analysis.field.from')}
              options={yearOptions}
              onChange={handleFromYearChange}
              value={fromYear}
              size="medium"
              fullWidth={false}
            />
            <SelectField
              label={t('cost_charge_analysis.field.to')}
              options={yearOptions}
              onChange={handleToYearChange}
              value={toYear}
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
          height="560px"
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
                columnWidth: 30,
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
              show: false,
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
          series={[
            {
              name: t(`cost_charge_analysis.text.yearly_${type}`),
              type: 'bar',
              data: series,
              color: theme.palette.blue[200],
            },
          ]}
          width="100%"
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <SecondaryTable
          columns={[
            'cost_charge_analysis.text.year',
            type === 'consumption' ? 'cost_charge_analysis.text.consumption' : 'cost_charge_analysis.text.cost',
          ]}
          rows={rows}
        />
      </Grid2>
    </Grid2>
  );
};
