import { ParseKeys } from 'i18next';

import { DashboardAreaChartProps } from './Area/Area.types';
import { DashboardBarChartProps } from './Bar/Bar.types';
import { DashboardDonutChartProps } from './Donut/Donut.types';
import { DashboardLineChartProps } from './Line/Line.types';
import { DashboardPieChartProps } from './Pie/Pie.types';

interface ViewAllProps {
  label: ParseKeys;
  onClick: () => void;
}

interface AreaChart extends DashboardAreaChartProps {
  type: 'area';
}

interface BarChart extends DashboardBarChartProps {
  type: 'bar';
}

interface DonutChart extends DashboardDonutChartProps {
  type: 'donut';
  viewAll?: ViewAllProps;
}

interface LineChart extends DashboardLineChartProps {
  type: 'line';
}

interface PieChart extends DashboardPieChartProps {
  type: 'pie';
  viewAll?: ViewAllProps;
}

export type DashboardChartProps = AreaChart | BarChart | DonutChart | LineChart | PieChart;
