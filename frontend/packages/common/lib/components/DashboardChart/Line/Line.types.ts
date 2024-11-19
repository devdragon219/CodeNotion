import { ApexOptions } from 'apexcharts';

import { ChartSeries } from '../../../interfaces/Chart';

export interface DashboardLineChartProps {
  annotations?: ApexOptions['annotations'];
  fill?: ApexOptions['fill'];
  legend?: boolean;
  plotOptions?: ApexOptions['plotOptions'];
  series: ChartSeries[];
  stroke?: ApexOptions['stroke'];
  xaxis: string[];
}
