import { DashboardSectionBackgroundColor } from '../../enums/DashboardSectionBackgroundColor';

export interface DashboardWidgetFormInput {
  guid: string;
  type: string;
  widgetId: number | null;
  width: number;
}

export interface DashboardBuilderRowFormInput {
  guid: string;
  rowId: number | null;
  widgets: DashboardWidgetFormInput[];
}

export interface DashboardBuilderSectionFormInput {
  backgroundColor: DashboardSectionBackgroundColor | null;
  guid: string;
  rows: DashboardBuilderRowFormInput[];
  sectionId: number | null;
  title: string;
}

export interface DashboardBuilderFormInput {
  sections: DashboardBuilderSectionFormInput[];
}
