import { DashboardWidgetConfiguration } from '../../../../interfaces/DashboardWidget';
import { DashboardBuilderRowFormInput } from '../../../../interfaces/FormInputs/DashboardBuilder';

export interface DashboardBuilderRowProps {
  hasBackground: boolean;
  path: [number, number];
  readonly?: boolean;
  row: DashboardBuilderRowFormInput;
  widgetConfigurations: DashboardWidgetConfiguration[];
  onChange: (row: DashboardBuilderRowFormInput) => void;
}
