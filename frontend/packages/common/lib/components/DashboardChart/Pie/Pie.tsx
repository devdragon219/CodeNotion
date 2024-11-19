import ReactApexChart from 'react-apexcharts';

import { useTheme } from '../../../contexts/theme/hook';
import { DashboardPieChartProps } from './Pie.types';

export const DashboardPieChart = ({ colors, labels, series }: DashboardPieChartProps) => {
  const { theme } = useTheme();

  return (
    <ReactApexChart
      type="pie"
      height="100%"
      options={{
        chart: {
          id: crypto.randomUUID(),
        },
        colors,
        dataLabels: {
          formatter: (val) => `${Math.floor(Number(val))}%`,
          style: {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.bodyLg.fontSize as string,
            fontWeight: theme.typography.bodyLg.fontWeight,
          },
        },
        labels,
        legend: {
          show: false,
        },
        tooltip: {
          fillSeriesColor: false,
          theme: 'light',
        },
      }}
      series={series}
    />
  );
};
