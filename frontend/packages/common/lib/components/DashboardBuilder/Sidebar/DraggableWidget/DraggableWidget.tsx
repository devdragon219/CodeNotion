import { useDraggable } from '@dnd-kit/core';
import { Grid2 } from '@mui/material';
import { useId } from 'react';

import { DashboardBuilderSidebarWidget } from '../Widget/Widget';
import { DashboardBuilderSidebarDraggableFieldProps } from './DraggableWidget.types';

export const DashboardBuilderSidebarDraggableField = ({
  widgetConfiguration,
}: DashboardBuilderSidebarDraggableFieldProps) => {
  const id = useId();

  const { attributes, listeners, setNodeRef } = useDraggable({
    data: {
      isSidebar: true,
      widget: widgetConfiguration.type,
    },
    id,
  });

  return (
    <Grid2 size={12} ref={setNodeRef} {...listeners} {...attributes}>
      <DashboardBuilderSidebarWidget widgetConfiguration={widgetConfiguration} />
    </Grid2>
  );
};
