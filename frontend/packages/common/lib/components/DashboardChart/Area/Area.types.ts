import { ApexOptions } from 'apexcharts';

import { ChartSeries } from '../../../interfaces/Chart';

export interface DashboardAreaChartProps {
  fill?: ApexOptions['fill'];
  height?: number;
  series: ChartSeries[];
  theme?: string;
}
