import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { Transition } from '../../../../Transition/Transition';
import { DashboardBuilderDraggableWidgetProps } from './DraggableWidget.types';
import { WidgetActions } from './WidgetActions/WidgetActions';

export const DashboardBuilderDraggableWidget = ({
  canIncreaseWidth,
  hasBackground,
  path,
  readonly,
  widget,
  widgetConfiguration,
  onChange,
}: DashboardBuilderDraggableWidgetProps) => {
  const { attributes, listeners, transform, transition, setActivatorNodeRef, setNodeRef } = useSortable({
    data: {
      path,
      widget,
    },
    disabled: readonly,
    id: widget.guid,
  });

  const [areActionsVisible, setActionsVisible] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setActionsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActionsVisible(false);
  }, []);

  const component = useMemo(
    () => widgetConfiguration?.getComponent({ useBoxShadow: !hasBackground, useMockData: !readonly }),
    [hasBackground, readonly, widgetConfiguration],
  );

  return (
    <Box
      ref={setNodeRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={(theme) => ({
        gridColumn: `span ${widget.width}`,
        borderRadius: 2,
        transform: CSS.Transform.toString(transform),
        position: 'relative',
        transition,
        ...(widget.type === 'placeholder' && {
          backgroundColor: theme.palette.grey[100],
          border: `1px dashed ${theme.palette.divider}`,
        }),
        ...(!readonly &&
          widget.type !== 'placeholder' && {
            backgroundColor: theme.palette.background.paper,
          }),
      })}
      {...(widget.type === 'placeholder'
        ? {
            ...attributes,
            ...listeners,
          }
        : {})}
    >
      {widget.type !== 'placeholder' && (
        <>
          {!readonly && (
            <Transition
              type="collapse"
              in={areActionsVisible}
              sx={{ zIndex: 1000, position: 'absolute', top: 0, left: 0 }}
            >
              <WidgetActions
                attributes={attributes}
                canIncreaseWidth={canIncreaseWidth}
                listeners={listeners}
                widget={widget}
                widgetConfiguration={widgetConfiguration}
                onChange={onChange}
                setActivatorNodeRef={setActivatorNodeRef}
              />
            </Transition>
          )}
          <Box sx={{ height: '100%' }}>{component}</Box>
        </>
      )}
    </Box>
  );
};
