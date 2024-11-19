import { DashboardSectionBackgroundColor } from '../../enums/DashboardSectionBackgroundColor';
import { WidgetSection } from '../../gql/types';
import {
  DashboardBuilderFormInput,
  DashboardBuilderRowFormInput,
  DashboardBuilderSectionFormInput,
  DashboardWidgetFormInput,
} from '../../interfaces/FormInputs/DashboardBuilder';
import { getEmptyDashboardBuilderSectionFormInput } from './initialValues';

export const parseWidgetSectionsToDashboardBuilderFormInput = (
  sections: WidgetSection[],
  widgetTypes: string[],
): DashboardBuilderFormInput => ({
  sections: sections.reduce<DashboardBuilderSectionFormInput[]>((acc, it, index) => {
    const section: DashboardBuilderSectionFormInput = {
      backgroundColor: (it.backgroundColor ?? null) as DashboardSectionBackgroundColor | null,
      guid: crypto.randomUUID(),
      rows: it.rows.reduce<DashboardBuilderRowFormInput[]>((acc, it) => {
        const row: DashboardBuilderRowFormInput = {
          guid: crypto.randomUUID(),
          rowId: it.id,
          widgets: it.widgets.reduce<DashboardWidgetFormInput[]>((acc, it) => {
            if (!widgetTypes.includes(it.type)) return acc;

            return [
              ...acc,
              {
                guid: crypto.randomUUID(),
                type: it.type,
                widgetId: it.id,
                width: it.width,
              },
            ];
          }, []),
        };

        if (row.widgets.length === 0) return acc;

        return [...acc, row];
      }, []),
      sectionId: it.id,
      title: it.title ?? '',
    };

    if (section.rows.length === 0) {
      if (index === sections.length - 1 && acc.length === 0) {
        return [getEmptyDashboardBuilderSectionFormInput()];
      }

      return acc;
    }

    return [...acc, section];
  }, []),
});
