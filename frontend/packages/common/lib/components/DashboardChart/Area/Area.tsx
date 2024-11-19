import ReactApexChart from 'react-apexcharts';

import { DASHBOARD_CHART_SIZE } from '../../../configs/dashboard';
import { getChartYAxisProps } from '../../../utils/apexchart/getChartYAxisProps';
import { DashboardAreaChartProps } from './Area.types';

export const DashboardAreaChart = ({ fill, height, series, theme }: DashboardAreaChartProps) => (
  <ReactApexChart
    type="area"
    height={height ?? DASHBOARD_CHART_SIZE}
    options={{
      ...(fill ? { fill } : {}),
      chart: {
        id: crypto.randomUUID(),
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        fillSeriesColor: false,
        followCursor: false,
        theme: theme ?? 'light',
        x: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        ...getChartYAxisProps(Math.max(...series.map(({ data }) => data).flat())),
        labels: {
          show: false,
        },
      },
    }}
    series={series}
    width="100%"
  />
);
