import { DashboardWidgetConfiguration } from '../../../../../interfaces/DashboardWidget';
import { DashboardWidgetFormInput } from '../../../../../interfaces/FormInputs/DashboardBuilder';

export interface DashboardBuilderDraggableWidgetProps {
  canIncreaseWidth: boolean;
  hasBackground: boolean;
  path: [number, number, number];
  readonly?: boolean;
  widget: DashboardWidgetFormInput;
  widgetConfiguration?: DashboardWidgetConfiguration;
  onChange: (widget: DashboardWidgetFormInput | null) => void;
}
