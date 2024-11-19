import { DashboardWidgetProps } from '@realgimm5/frontend-common/interfaces';

export interface TicketsExpirationsListWidgetProps extends DashboardWidgetProps {
  isIssue: boolean;
  isMandatoryByLaw: boolean;
}
