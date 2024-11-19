import { useDraggable } from '@dnd-kit/core';
import { Grid2 } from '@mui/material';
import { useId } from 'react';

import { FormBuilderField } from '../../Field/Field';
import { FormBuilderSidebarDraggableFieldProps } from './DraggableField.types';

export const FormBuilderSidebarDraggableField = ({ disabled, type }: FormBuilderSidebarDraggableFieldProps) => {
  const id = useId();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    disabled,
    data: {
      field: type,
      isSidebar: true,
    },
  });

  return (
    <Grid2 size={12} ref={setNodeRef} {...listeners} {...attributes}>
      <FormBuilderField disabled={disabled} type={type} />
    </Grid2>
  );
};
