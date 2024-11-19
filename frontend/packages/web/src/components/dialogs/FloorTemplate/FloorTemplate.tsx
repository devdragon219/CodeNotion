import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  CloseDialog,
  Dialog,
  DialogContent,
  Form,
  RepeatableField,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FloorTemplateFormInput, FloorTemplatesFieldValues } from '../../../interfaces/FormInputs/Floor';
import { getEmptyFloorTemplateFormInput } from '../../../utils/floorTemplate/initialValues';
import { getFloorTemplatesSchema } from '../../../utils/floorTemplate/schemas/floorTemplates';
import { FloorTemplateField } from './Field/Field';
import { FloorTemplateDialogProps } from './FloorTemplate.types';

export const FloorTemplateDialog = ({ input, readonly, onClose, onSave }: FloorTemplateDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
  } = useForm<FloorTemplatesFieldValues>({
    defaultValues: {
      floorTemplates: input ? [input.floorTemplate] : [getEmptyFloorTemplateFormInput()],
    },
    resolver: yupResolver(getFloorTemplatesSchema(t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'floorTemplates',
  });

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);
  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const handleAddFloorTemplate = useCallback(() => {
    append(getEmptyFloorTemplateFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: { floorTemplates: FloorTemplateFormInput[] }) => {
      onSave(
        input
          ? {
              ...input,
              floorTemplate: formValues.floorTemplates[0],
            }
          : formValues.floorTemplates,
      );
    },
    [input, onSave],
  );

  const handleWorkingClose = useCallback(() => {
    onSubmit(getValues());
  }, [getValues, onSubmit]);

  const handleDestructiveClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return isCloseConfirmationDialogOpen ? (
    <CloseDialog
      canSave={canSave}
      onCancel={closeCloseConfirmationDialog}
      onSave={handleWorkingClose}
      onClose={handleDestructiveClose}
    />
  ) : (
    <Dialog
      open
      title={`floor.dialog.${input ? (readonly ? 'view' : 'update') : 'create'}.title`}
      onClose={readonly ? onClose : openCloseConfirmationDialog}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button
              color="primary"
              variant="contained"
              startIcon={<CheckCircleOutline />}
              {...(readonly ? { onClick: onClose } : { type: 'submit' })}
            >
              {t(readonly ? 'core.button.close' : `floor.dialog.${input ? 'update' : 'create'}.save`)}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            {!readonly && <SectionTitle value={`floor.dialog.${input ? 'update' : 'create'}.description`} />}
            {input ? (
              <Grid2 size={12}>
                <FloorTemplateField control={control} errors={errors} index={0} readonly={readonly} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <FloorTemplateField control={control} errors={errors} index={index} readonly={readonly} />
                        </RepeatableField>
                      ))}
                    </Stack>
                  </Grid2>
                )}
                {!readonly && (
                  <Grid2 size={12}>
                    <Button
                      color="secondary"
                      variant="contained"
                      startIcon={<AddCircleOutline />}
                      onClick={handleAddFloorTemplate}
                    >
                      {t('floor.action.add_floor')}
                    </Button>
                  </Grid2>
                )}
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
