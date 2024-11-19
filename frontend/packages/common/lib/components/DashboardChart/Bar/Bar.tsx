import ReactApexChart from 'react-apexcharts';

import { DASHBOARD_CHART_SIZE } from '../../../configs/dashboard';
import { useTheme } from '../../../contexts/theme/hook';
import { getChartYAxisProps } from '../../../utils/apexchart/getChartYAxisProps';
import { DashboardBarChartProps } from './Bar.types';

export const DashboardBarChart = ({ series, xaxis }: DashboardBarChartProps) => {
  const { theme } = useTheme();

  return (
    <ReactApexChart
      type="bar"
      height={DASHBOARD_CHART_SIZE}
      options={{
        chart: {
          id: crypto.randomUUID(),
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
        grid: {
          borderColor: theme.palette.grey[400],
          strokeDashArray: 4,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        stroke: {
          curve: 'straight',
          width: 2,
        },
        tooltip: {
          followCursor: false,
          x: {
            show: false,
          },
        },
        xaxis: {
          axisBorder: {
            color: theme.palette.grey[300],
          },
          axisTicks: {
            color: theme.palette.grey[300],
            height: 5,
          },
          categories: xaxis,
          labels: {
            style: {
              colors: theme.palette.grey[500],
            },
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          ...getChartYAxisProps(Math.max(...series.map(({ data }) => data).flat())),
          labels: {
            style: {
              colors: theme.palette.grey[500],
            },
          },
        },
      }}
      series={series}
      width="100%"
    />
  );
};
