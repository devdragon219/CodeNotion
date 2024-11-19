import { DashboardWidgetConfiguration } from '../../../interfaces/DashboardWidget';
import { DashboardBuilderSectionFormInput } from '../../../interfaces/FormInputs/DashboardBuilder';

export interface DashboardBuilderSectionProps {
  hasPlaceholder: boolean;
  path: number;
  readonly?: boolean;
  section: DashboardBuilderSectionFormInput;
  widgetConfigurations: DashboardWidgetConfiguration[];
  onChange: (section: DashboardBuilderSectionFormInput | null) => void;
}
