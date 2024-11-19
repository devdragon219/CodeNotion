import { WidgetSectionInput } from '../../gql/types';
import { DashboardBuilderFormInput } from '../../interfaces/FormInputs/DashboardBuilder';
import { getStringOrNull } from '../stringUtils';

export const parseDashboardBuilderFormInputToWidgetSectionsInputs = ({
  sections,
}: DashboardBuilderFormInput): WidgetSectionInput[] =>
  sections.map((section) => ({
    backgroundColor: section.backgroundColor,
    id: section.sectionId,
    title: getStringOrNull(section.title),
    rows: section.rows.map((row) => ({
      id: row.rowId,
      widgets: row.widgets.map((widget) => ({
        id: widget.widgetId,
        type: widget.type,
        width: widget.width,
      })),
    })),
  }));
