import { DashboardWidgetConfiguration } from '../../interfaces/DashboardWidget';
import { DashboardBuilderSectionFormInput } from '../../interfaces/FormInputs/DashboardBuilder';

export interface DashboardBuilderProps {
  readonly?: boolean;
  value?: DashboardBuilderSectionFormInput[];
  widgetConfigurations: DashboardWidgetConfiguration[];
  onChange?: (value: DashboardBuilderSectionFormInput[]) => void;
}
