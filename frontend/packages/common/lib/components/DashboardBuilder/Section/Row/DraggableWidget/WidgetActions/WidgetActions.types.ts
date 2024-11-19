import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import { DashboardWidgetConfiguration } from '../../../../../../interfaces/DashboardWidget';
import { DashboardWidgetFormInput } from '../../../../../../interfaces/FormInputs/DashboardBuilder';

export interface WidgetActionsProps {
  attributes: DraggableAttributes;
  canIncreaseWidth: boolean;
  listeners: SyntheticListenerMap | undefined;
  widget: DashboardWidgetFormInput;
  widgetConfiguration?: DashboardWidgetConfiguration;
  onChange: (widget: DashboardWidgetFormInput | null) => void;
  setActivatorNodeRef: (node: HTMLElement | null) => void;
}
