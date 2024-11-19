import { CompressTwoTone, DeleteTwoTone, DragIndicator, ExpandTwoTone } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useCallback } from 'react';

import { DASHBOARD_MAX_WIDGETS_PER_ROW, DASHBOARD_WIDGET_MIN_WIDTH } from '../../../../../../configs/dashboard';
import { WidgetActionsProps } from './WidgetActions.types';

export const WidgetActions = ({
  attributes,
  canIncreaseWidth,
  listeners,
  widget,
  widgetConfiguration,
  onChange,
  setActivatorNodeRef,
}: WidgetActionsProps) => {
  const handleIncrementWidth = useCallback(() => {
    onChange({
      ...widget,
      width: widget.width + 1,
    });
  }, [onChange, widget]);

  const handleDecrementWidth = useCallback(() => {
    onChange({
      ...widget,
      width: widget.width - 1,
    });
  }, [onChange, widget]);

  const handleRemove = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        background: theme.palette.grey[200],
        borderTopLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        padding: 1,
      })}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <IconButton size="small" ref={setActivatorNodeRef} {...attributes} {...listeners}>
          <DragIndicator />
        </IconButton>
        <IconButton
          size="small"
          disabled={widget.width >= DASHBOARD_MAX_WIDGETS_PER_ROW || !canIncreaseWidth}
          onClick={handleIncrementWidth}
        >
          <ExpandTwoTone sx={{ transform: 'rotate(90deg)' }} />
        </IconButton>
        <IconButton
          size="small"
          disabled={widget.width <= (widgetConfiguration?.minWidth ?? DASHBOARD_WIDGET_MIN_WIDTH)}
          onClick={handleDecrementWidth}
        >
          <CompressTwoTone sx={{ transform: 'rotate(90deg)' }} />
        </IconButton>
        <IconButton size="small" onClick={handleRemove}>
          <DeleteTwoTone />
        </IconButton>
      </Box>
    </Box>
  );
};
