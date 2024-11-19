import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AddCircleOutline, DeleteTwoTone } from '@mui/icons-material';
import { Box, Button, Divider, Grid2, IconButton, Stack } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomFieldType } from '../../../../gql/types';
import { Accordion } from '../../../Accordion/Accordion';
import { CheckboxField } from '../../../Fields/Checkbox/Checkbox';
import { RepeatableField } from '../../../Fields/Repeatable/Repeatable';
import { TextField } from '../../../Fields/Text/Text';
import { FormBuilderFieldIcon } from '../../FieldIcon/FieldIcon';
import { FormBuilderContainerDraggableFieldProps } from './DraggableField.types';

export const FormBuilderContainerDraggableField = ({
  disabled,
  field,
  index,
  readonly,
  onChange,
}: FormBuilderContainerDraggableFieldProps) => {
  const { t } = useTranslation();
  const { attributes, listeners, transform, transition, setActivatorNodeRef, setNodeRef } = useSortable({
    id: field.guid,
    disabled: disabled ?? readonly,
    data: {
      field,
      index,
    },
  });

  const handleNameChange = useCallback(
    (name: string) => {
      onChange({
        ...field,
        name,
      });
    },
    [field, onChange],
  );
  const handleCheckboxChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, isMandatory: boolean) => {
      onChange({
        ...field,
        isMandatory,
      });
    },
    [field, onChange],
  );

  const handleAddValidValue = useCallback(() => {
    onChange({
      ...field,
      validValues: [...field.validValues, ''],
    });
  }, [field, onChange]);
  const handleRemoveValidValue = useCallback(
    (index: number) => {
      onChange({
        ...field,
        validValues: field.validValues.filter((_, idx) => idx !== index),
      });
    },
    [field, onChange],
  );
  const handleValidValueChange = useCallback(
    (index: number) => (value: string) => {
      onChange({
        ...field,
        validValues: field.validValues.map((it, idx) => (idx === index ? value : it)),
      });
    },
    [field, onChange],
  );

  const handleRemove = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        height: '100%',
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...(field.fieldId === 'placeholder'
        ? {
            ...attributes,
            ...listeners,
          }
        : {})}
    >
      {field.fieldId !== 'placeholder' && (
        <Accordion
          expanded={false}
          icon={
            <Box ref={setActivatorNodeRef} {...attributes} {...listeners}>
              <FormBuilderFieldIcon type={field.fieldType} />
            </Box>
          }
          title={
            <TextField
              sx={{ flexGrow: 1 }}
              value={field.name}
              onChange={handleNameChange}
              onClick={(e) => {
                e.stopPropagation();
              }}
              placeholder={t('common.component.form_builder.name_placeholder')}
              size="small"
              variant="standard"
              disabled={disabled}
              readonly={readonly}
            />
          }
          subtitle={field.isMandatory ? t('common.component.form_builder.required') : undefined}
        >
          <Grid2 container spacing={2}>
            {field.fieldType === CustomFieldType.SingleItemFromList && (
              <>
                {field.validValues.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {field.validValues.map((value, idx) => (
                        <RepeatableField
                          key={idx}
                          iconPositionAbsolute={false}
                          index={idx}
                          onDelete={handleRemoveValidValue}
                        >
                          <TextField
                            value={value}
                            onChange={handleValidValueChange(idx)}
                            placeholder={t('common.component.form_builder.option_placeholder')}
                            size="medium"
                            disabled={disabled}
                            readonly={readonly}
                          />
                        </RepeatableField>
                      ))}
                    </Stack>
                  </Grid2>
                )}
                {!disabled && !readonly && (
                  <Grid2 size={12}>
                    <Button
                      color="secondary"
                      variant="text"
                      startIcon={<AddCircleOutline />}
                      onClick={handleAddValidValue}
                    >
                      {t('common.component.form_builder.add_option')}
                    </Button>
                  </Grid2>
                )}
              </>
            )}
            <Grid2 size={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                <CheckboxField
                  value={field.isMandatory}
                  onChange={handleCheckboxChange}
                  label={t('common.component.form_builder.required')}
                  disabled={disabled}
                  readonly={readonly}
                />
                {!disabled && !readonly && (
                  <IconButton onClick={handleRemove}>
                    <DeleteTwoTone />
                  </IconButton>
                )}
              </Box>
            </Grid2>
          </Grid2>
        </Accordion>
      )}
    </Box>
  );
};
