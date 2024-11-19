import ReactApexChart from 'react-apexcharts';

import { DashboardDonutChartProps } from './Donut.types';

export const DashboardDonutChart = ({ colors, labels, series }: DashboardDonutChartProps) => (
  <ReactApexChart
    type="donut"
    height="100%"
    options={{
      chart: {
        id: crypto.randomUUID(),
      },
      colors,
      dataLabels: {
        enabled: false,
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
