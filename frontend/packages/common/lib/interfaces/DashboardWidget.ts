import { ParseKeys } from 'i18next';
import { ReactElement } from 'react';

export interface DashboardWidgetProps {
  useBoxShadow?: boolean;
  useMockData?: boolean;
}

export interface DashboardWidgetConfiguration {
  icon: ReactElement;
  minWidth: number;
  title: ParseKeys;
  type: string;
  getComponent: (props: DashboardWidgetProps) => ReactElement;
}
