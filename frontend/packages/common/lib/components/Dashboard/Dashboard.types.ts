import { DocumentNode } from 'graphql';
import { ParseKeys } from 'i18next';

import { DashboardWidgetConfiguration } from '../../interfaces/DashboardWidget';
import { MenuGroup } from '../../interfaces/Menu';

export interface DashboardProps {
  mutation: DocumentNode;
  mutationKey: string;
  query: DocumentNode;
  queryKey: string;
  shouldRedirect?: {
    menu: MenuGroup[];
    unsupportedFeatures: string[];
  };
  title: ParseKeys;
  widgetConfigurations: DashboardWidgetConfiguration[];
}
