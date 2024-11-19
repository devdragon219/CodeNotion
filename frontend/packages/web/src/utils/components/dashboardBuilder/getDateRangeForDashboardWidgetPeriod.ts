import { parseDateToString } from '@realgimm5/frontend-common/utils';
import { sub } from 'date-fns';

import { DashboardWidgetPeriod } from '../../../enums/DashboardWidgetPeriod';

export const getDateRangeForDashboardWidgetPeriod = (
  period: DashboardWidgetPeriod,
  customStartDate: Date | null = null,
  customEndDate: Date | null = null,
) => {
  const getStartDate = () => {
    switch (period) {
      case DashboardWidgetPeriod.Week:
        return sub(new Date(), { weeks: 1 });
      case DashboardWidgetPeriod.BiWeek:
        return sub(new Date(), { weeks: 2 });
      case DashboardWidgetPeriod.Month:
        return sub(new Date(), { months: 1 });
      case DashboardWidgetPeriod.Quarter:
      case DashboardWidgetPeriod.QuarterPerDay:
      case DashboardWidgetPeriod.QuarterPerWeek:
        return sub(new Date(), { months: 3 });
      case DashboardWidgetPeriod.Semester:
        return sub(new Date(), { months: 6 });
      case DashboardWidgetPeriod.Year:
      case DashboardWidgetPeriod.YearPerWeek:
      case DashboardWidgetPeriod.YearPerMonth:
        return sub(new Date(), { years: 1 });
      case DashboardWidgetPeriod.Custom:
        return customStartDate ?? new Date();
    }
  };

  return {
    startDate: parseDateToString(getStartDate())!,
    endDate: parseDateToString(customEndDate ?? new Date())!,
  };
};
