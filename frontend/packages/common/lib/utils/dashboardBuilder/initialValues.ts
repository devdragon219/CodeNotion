import {
  DashboardBuilderFormInput,
  DashboardBuilderRowFormInput,
  DashboardBuilderSectionFormInput,
  DashboardWidgetFormInput,
} from '../../interfaces/FormInputs/DashboardBuilder';

export const getEmptyDashboardWidgetFormInput = (type: string, width: number): DashboardWidgetFormInput => ({
  guid: crypto.randomUUID(),
  type,
  widgetId: null,
  width,
});

export const getPlaceholderDashboardWidgetFormInput = (width: number): DashboardWidgetFormInput =>
  getEmptyDashboardWidgetFormInput('placeholder', width);

export const getEmptyDashboardBuilderRowFormInput = (): DashboardBuilderRowFormInput => ({
  guid: crypto.randomUUID(),
  rowId: null,
  widgets: [],
});

export const getEmptyDashboardBuilderSectionFormInput = (
  rows: DashboardBuilderRowFormInput[] = [],
): DashboardBuilderSectionFormInput => ({
  backgroundColor: null,
  guid: crypto.randomUUID(),
  rows,
  sectionId: null,
  title: '',
});

export const getEmptyDashboardBuilderFormInput = (): DashboardBuilderFormInput => ({
  sections: [getEmptyDashboardBuilderSectionFormInput()],
});
