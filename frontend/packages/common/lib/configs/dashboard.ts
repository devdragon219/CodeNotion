import colors from '../assets/scss/_variables.module.scss';
import { DashboardSectionBackgroundColor } from '../enums/DashboardSectionBackgroundColor';

export const DASHBOARD_MAX_WIDGETS_PER_ROW = 12;

export const DASHBOARD_ROW_MIN_HEIGHT = '75px';
export const DASHBOARD_CHART_SIZE = '240px';

export const DASHBOARD_WIDGET_MIN_WIDTH = 2;

export const DASHBOARD_SECTION_BACKGROUND_COLORS: Record<DashboardSectionBackgroundColor, string> = {
  [DashboardSectionBackgroundColor.BLUE]: colors.blue10,
  [DashboardSectionBackgroundColor.GREY]: colors.grey50,
};
