import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_BORDER_RADIUS } from '../../configs/defaults';
import { CustomFieldType } from '../../gql/types';
import { FormBuilderFieldFormInput, FormBuilderRowFormInput } from '../../interfaces/FormInputs/FormBuilder';
import { getPlaceholderFormBuilderFieldFormInput } from '../../utils/formBuilder/initialValues';
import { FormBuilderContainer } from './Container/Container';
import { FormBuilderField } from './Field/Field';
import { FormBuilderProps } from './FormBuilder.types';
import { FormBuilderSidebar } from './Sidebar/Sidebar';

const FormBuilder = forwardRef<HTMLDivElement, FormBuilderProps>(({ disabled, readonly, value, onChange }, ref) => {
  const [activeField, setActiveField] = useState<FormBuilderFieldFormInput | null>(null);
  const [activeSidebarField, setActiveSidebarField] = useState<CustomFieldType | null>(null);
  const [hasPlaceholder, setHasPlaceholder] = useState(false);
  const [fields, setFields] = useState(value ?? []);

  const placeholderIndex = useMemo(
    () =>
      fields.reduce<number[]>((acc, { fields }, idx) => {
        const placeholderIndex = fields.findIndex(({ fieldId }) => fieldId === 'placeholder');
        if (placeholderIndex === -1) {
          return acc;
        }
        return [idx, placeholderIndex];
      }, []),
    [fields],
  );

  useEffect(() => {
    onChange?.(fields);
    // eslint-disable-next-line
  }, [fields]);

  const movePlaceholder = useCallback(
    (index: number | [number, number]) => {
      setFields((rows) => {
        // If index is same place of placeholder do nothing
        if (Array.isArray(index) && index[0] === placeholderIndex[0] && index[1] === placeholderIndex[1]) {
          return rows;
        }

        // If row is same as placeholder, just move around the row
        if (placeholderIndex[0] === (Array.isArray(index) ? index[0] : index)) {
          return rows.map((row, idx) => {
            if (idx === placeholderIndex[0]) {
              return {
                ...row,
                fields: arrayMove(row.fields, placeholderIndex[1], Array.isArray(index) ? index[1] : row.fields.length),
              };
            }
            return row;
          });
        }

        // Otherwise remove placeholder from older row and attach to new one
        return rows.map((row, idx) => {
          if (idx === placeholderIndex[0]) {
            return {
              ...row,
              fields: row.fields.filter((_, idx) => idx !== placeholderIndex[1]),
            };
          } else if (idx === (Array.isArray(index) ? index[0] : index)) {
            const placeholder = getPlaceholderFormBuilderFieldFormInput();
            if (Array.isArray(index)) {
              row.fields.splice(index[1], 0, placeholder);
              return row;
            } else {
              return {
                ...row,
                fields: [...row.fields, placeholder],
              };
            }
          }
          return row;
        });
      });
    },
    [placeholderIndex],
  );

  const pushPlaceholder = useCallback((index: number | [number, number]) => {
    const placeholder = getPlaceholderFormBuilderFieldFormInput();
    setFields((rows) =>
      rows.map((row, idx) => {
        if (idx !== (Array.isArray(index) ? index[0] : index)) {
          return row;
        }

        if (Array.isArray(index)) {
          row.fields.splice(index[1], 0, placeholder);
          return row;
        } else {
          return {
            ...row,
            fields: [...row.fields, placeholder],
          };
        }
      }),
    );
  }, []);

  const removePlaceholder = useCallback(() => {
    setFields((rows) =>
      rows.map((row) => ({
        ...row,
        fields: row.fields.filter(({ fieldId }) => fieldId !== 'placeholder'),
      })),
    );
  }, []);

  const replaceFieldWithPlaceholder = useCallback((index: [number, number]) => {
    const placeholder = getPlaceholderFormBuilderFieldFormInput();
    // Replace field with placeholder
    setFields((rows) =>
      rows
        .map((row, idx) => {
          if (idx !== (Array.isArray(index) ? index[0] : index)) {
            return row;
          }

          if (Array.isArray(index)) {
            return {
              ...row,
              fields: row.fields.map((field, idx) => (idx === index[1] ? placeholder : field)),
            };
          }

          return {
            ...row,
            fields: [placeholder],
          };
        })
        .reduce<FormBuilderRowFormInput[]>((acc, row, idx) => {
          // If only one row/widget do nothing
          if (rows.length === 1 && rows[0].fields.length === 1) return [row];

          // Prepend an empty row only if not dragging the only one widget in the first row
          if (idx === 0 && (index[0] !== 0 || rows[index[0]].fields.length > 1)) {
            acc = [
              {
                guid: crypto.randomUUID(),
                fields: [],
              },
            ];
          }

          acc = [...acc, row];

          // Push an empty row only if not dragging the only one widget in the row
          if (![idx, idx + 1, rows.length - 1].includes(index[0]) || rows[index[0]].fields.length > 1) {
            acc = [
              ...acc,
              {
                guid: crypto.randomUUID(),
                fields: [],
              },
            ];
          }

          return acc;
        }, []),
    );
    setHasPlaceholder(true);
  }, []);

  const removePlaceholderAndEmptyRows = useCallback(() => {
    setFields((rows) =>
      rows
        .map((row) => ({
          ...row,
          fields: row.fields.filter(({ fieldId }) => fieldId !== 'placeholder'),
        }))
        .filter((row) => row.fields.length !== 0),
    );
  }, []);

  const reset = useCallback(() => {
    setActiveSidebarField(null);
    setActiveField(null);
    setHasPlaceholder(false);
  }, []);

  const handleDragStart = useCallback(
    ({ active }: DragStartEvent) => {
      const activeData = active.data.current;
      if (!activeData) {
        return;
      }
      const { field, index } = activeData;

      if (activeData.isSidebar) {
        setActiveSidebarField(field as CustomFieldType);
        setFields((rows) => {
          if (rows.length === 0) {
            return [
              ...rows,
              {
                guid: crypto.randomUUID(),
                fields: [],
              },
            ];
          }

          return rows.reduce<FormBuilderRowFormInput[]>((acc, row, idx) => {
            // Add an initial row
            if (idx === 0) {
              acc = [
                {
                  guid: crypto.randomUUID(),
                  fields: [],
                },
              ];
            }

            // Push current row + empty row
            acc = [
              ...acc,
              row,
              {
                guid: crypto.randomUUID(),
                fields: [],
              },
            ];

            return acc;
          }, []);
        });
      } else {
        setActiveField(field as FormBuilderFieldFormInput);
        replaceFieldWithPlaceholder(index as [number, number]);
      }
    },
    [replaceFieldWithPlaceholder],
  );

  const handleDragOver = useCallback(
    ({ over }: DragOverEvent) => {
      if (!over) {
        removePlaceholder();
        setHasPlaceholder(false);
      } else {
        const overData = over.data.current;
        if (!overData) {
          return;
        }
        const { index } = overData;

        if (hasPlaceholder) {
          movePlaceholder(index as number | [number, number]);
        } else {
          pushPlaceholder(index as number | [number, number]);
          setHasPlaceholder(true);
        }
      }
    },
    [hasPlaceholder, movePlaceholder, pushPlaceholder, removePlaceholder],
  );

  const handleDragEnd = useCallback(
    ({ over }: DragEndEvent) => {
      if (!over) {
        removePlaceholderAndEmptyRows();
        reset();
        return;
      }

      const overData = over.data.current;
      if (!overData) {
        return;
      }
      const { index } = overData;

      const nextField: FormBuilderFieldFormInput = activeSidebarField
        ? {
            fieldId: null,
            fieldType: activeSidebarField,
            guid: window.crypto.randomUUID(),
            isMandatory: false,
            name: '',
            validValues: [],
          }
        : activeField!;

      setFields((rows) =>
        rows
          .map((row, idx) => {
            if (Array.isArray(index)) {
              return idx === index[0]
                ? {
                    ...row,
                    fields: row.fields.map((field, idx) => (idx === index[1] ? nextField : field)),
                  }
                : row;
            }

            return idx === index
              ? {
                  ...row,
                  fields: row.fields.map((field) => (field.fieldId === 'placeholder' ? nextField : field)),
                }
              : row;
          })
          .filter((row) => row.fields.length !== 0),
      );

      reset();
    },
    [activeField, activeSidebarField, reset, removePlaceholderAndEmptyRows],
  );

  const handleChange = useCallback(
    (index: number) => (value: FormBuilderFieldFormInput[]) => {
      setFields((rows) =>
        rows
          .map((row, idx) => ({
            ...row,
            fields: idx === index ? value : row.fields,
          }))
          .filter((row) => row.fields.length !== 0),
      );
    },
    [],
  );

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <Box ref={ref} sx={{ display: 'flex', height: '100%', gap: 3 }}>
        <Box
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            gap: '24px',
            height: '100%',
            ...(hasPlaceholder
              ? {
                  border: `1px dashed ${theme.palette.blue[500]}`,
                  backgroundColor: theme.palette.blue[50],
                }
              : {}),
          })}
        >
          <SortableContext
            disabled={disabled ?? readonly}
            id="root"
            strategy={verticalListSortingStrategy}
            items={fields.map(({ guid }) => guid)}
          >
            {fields.map(({ guid, fields }, index) => (
              <FormBuilderContainer
                key={guid}
                disabled={disabled}
                fields={fields}
                index={index}
                readonly={readonly}
                sx={{
                  ...(index === 0 ? { pt: 3 } : {}),
                  ...(fields.length === 1 || index === fields.length - 1 ? { pb: 3 } : {}),
                }}
                onChange={handleChange(index)}
              />
            ))}
          </SortableContext>
        </Box>
        {!readonly && <FormBuilderSidebar disabled={disabled} />}
      </Box>
      <DragOverlay dropAnimation={null}>
        {activeField && <FormBuilderField type={activeField.fieldType} overlay />}
        {activeSidebarField && <FormBuilderField type={activeSidebarField} overlay />}
      </DragOverlay>
    </DndContext>
  );
});
FormBuilder.displayName = 'FormBuilder';

export { FormBuilder };
