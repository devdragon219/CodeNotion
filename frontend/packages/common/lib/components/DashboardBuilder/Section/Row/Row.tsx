import { useDroppable } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { useCallback, useMemo } from 'react';

import { DASHBOARD_MAX_WIDGETS_PER_ROW, DASHBOARD_ROW_MIN_HEIGHT } from '../../../../configs/dashboard';
import { DashboardWidgetFormInput } from '../../../../interfaces/FormInputs/DashboardBuilder';
import { DashboardBuilderDraggableWidget } from './DraggableWidget/DraggableWidget';
import { DashboardBuilderRowProps } from './Row.types';

export const DashboardBuilderRow = ({
  hasBackground,
  path,
  readonly,
  row,
  widgetConfigurations,
  onChange,
}: DashboardBuilderRowProps) => {
  const { setNodeRef } = useDroppable({
    data: {
      isRow: true,
      path,
    },
    disabled: readonly,
    id: row.guid,
  });

  const hasAvailableSlots = useMemo(
    () => row.widgets.reduce((acc, widget) => widget.width + acc, 0) < DASHBOARD_MAX_WIDGETS_PER_ROW,
    [row.widgets],
  );

  const handleChange = useCallback(
    (index: number) => (value: DashboardWidgetFormInput | null) => {
      if (value) {
        onChange({
          ...row,
          widgets: row.widgets.map((widget, colIndex) => (colIndex === index ? value : widget)),
        });
      } else {
        onChange({
          ...row,
          widgets: row.widgets.filter((_, colIndex) => colIndex !== index),
        });
      }
    },
    [row, onChange],
  );

  return (
    <SortableContext
      id={`row_${row.guid}`}
      strategy={horizontalListSortingStrategy}
      items={row.widgets.map(({ guid }) => guid)}
    >
      <Box
        ref={setNodeRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${DASHBOARD_MAX_WIDGETS_PER_ROW}, 1fr)`,
          minHeight: DASHBOARD_ROW_MIN_HEIGHT,
          gap: 3,
        }}
      >
        {row.widgets.map((widget, colIndex) => (
          <DashboardBuilderDraggableWidget
            key={widget.widgetId}
            canIncreaseWidth={hasAvailableSlots}
            hasBackground={hasBackground}
            path={[...path, colIndex]}
            readonly={readonly}
            widget={widget}
            widgetConfiguration={widgetConfigurations.find(({ type }) => type === widget.type)}
            onChange={handleChange(colIndex)}
          />
        ))}
      </Box>
    </SortableContext>
  );
};
