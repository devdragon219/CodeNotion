import { LineChartType } from '@realgimm5/frontend-common/gql/types';

import { DashboardWidgetPeriod } from '../../../enums/DashboardWidgetPeriod';

export const getLineChartTypeForDashboardWidgetPeriod = (
  period: DashboardWidgetPeriod,
  customChartType: LineChartType,
) => {
  switch (period) {
    case DashboardWidgetPeriod.Week:
    case DashboardWidgetPeriod.BiWeek:
    case DashboardWidgetPeriod.Month:
    case DashboardWidgetPeriod.QuarterPerDay:
      return LineChartType.Daily;
    case DashboardWidgetPeriod.Quarter:
    case DashboardWidgetPeriod.QuarterPerWeek:
    case DashboardWidgetPeriod.Semester:
    case DashboardWidgetPeriod.YearPerWeek:
      return LineChartType.Weekly;
    case DashboardWidgetPeriod.Year:
    case DashboardWidgetPeriod.YearPerMonth:
      return LineChartType.Monthly;
    case DashboardWidgetPeriod.Custom:
      return customChartType;
  }
};
