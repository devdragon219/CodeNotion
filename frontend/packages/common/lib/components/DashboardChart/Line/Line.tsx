import ReactApexChart from 'react-apexcharts';

import { DASHBOARD_CHART_SIZE } from '../../../configs/dashboard';
import { useTheme } from '../../../contexts/theme/hook';
import { getChartYAxisProps } from '../../../utils/apexchart/getChartYAxisProps';
import { DashboardLineChartProps } from './Line.types';

export const DashboardLineChart = ({
  annotations,
  fill,
  legend = true,
  plotOptions,
  series,
  stroke,
  xaxis,
}: DashboardLineChartProps) => {
  const { theme } = useTheme();

  return (
    <ReactApexChart
      type="line"
      height={DASHBOARD_CHART_SIZE}
      options={{
        ...(annotations ? { annotations } : {}),
        ...(fill ? { fill } : {}),
        ...(plotOptions ? { plotOptions } : {}),
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
        legend: {
          show: legend,
        },
        stroke: stroke ?? {
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
