import { useDroppable } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { useCallback } from 'react';

import { FormBuilderFieldFormInput } from '../../../interfaces/FormInputs/FormBuilder';
import { parseSxPropsToArray } from '../../../utils/muiUtils';
import { FormBuilderContainerProps } from './Container.types';
import { FormBuilderContainerDraggableField } from './DraggableField/DraggableField';

export const FormBuilderContainer = ({
  disabled,
  fields,
  index,
  readonly,
  sx,
  onChange,
}: FormBuilderContainerProps) => {
  const { setNodeRef } = useDroppable({
    id: index,
    disabled: disabled ?? readonly,
    data: {
      index,
      isContainer: true,
    },
  });

  const handleChange = useCallback(
    (index: number) => (value: FormBuilderFieldFormInput | null) => {
      if (value) {
        onChange(fields.map((field, idx) => (idx === index ? value : field)));
      } else {
        onChange(fields.filter((_, idx) => idx !== index));
      }
    },
    [fields, onChange],
  );

  return (
    <SortableContext
      id={`container-${index}`}
      strategy={horizontalListSortingStrategy}
      items={fields.map(({ guid }) => guid)}
    >
      <Box
        ref={setNodeRef}
        sx={[{ display: 'flex', flex: 1, height: '100%', gap: 3, px: 1.5, py: 1.5 }, ...parseSxPropsToArray(sx)]}
      >
        {fields.map((field, idx) => (
          <FormBuilderContainerDraggableField
            key={field.guid}
            disabled={disabled}
            field={field}
            index={[index, idx]}
            readonly={readonly}
            onChange={handleChange(idx)}
          />
        ))}
      </Box>
    </SortableContext>
  );
};
