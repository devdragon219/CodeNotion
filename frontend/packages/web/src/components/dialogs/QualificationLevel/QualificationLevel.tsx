import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { CloseDialog, Dialog, DialogContent, Form, TextField } from '@realgimm5/frontend-common/components';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useQualificationLevel } from '../../../hooks/useQualificationLevel';
import { QualificationLevelFormInput } from '../../../interfaces/FormInputs/QualificationLevel';
import { getEmptyQualificationLevelFormInput } from '../../../utils/qualificationLevel/initialValues';
import { getQualificationLevelSchema } from '../../../utils/qualificationLevel/schemas/qualificationLevel';
import { QualificationLevelDialogProps } from './QualificationLevel.types';

export const QualificationLevelDialog = ({ input, readonly, onClose, onSave }: QualificationLevelDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const { checkCanUseInternalCode, getInternalCode } = useQualificationLevel();

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<QualificationLevelFormInput>({
    defaultValues: input ?? getEmptyQualificationLevelFormInput(),
    resolver: yupResolver(getQualificationLevelSchema(canUseInternalCode, t)),
  });

  const internalCode = useWatch({ control, name: 'internalCode' });
  const debouncedInternalCode = useDebounce(internalCode);
  const qualificationLevelId = useWatch({ control, name: 'qualificationLevelId' });
  const debouncedQualificationLevelId = useDebounce(qualificationLevelId);

  useEffect(() => {
    checkCanUseInternalCode(debouncedInternalCode, debouncedQualificationLevelId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedQualificationLevelId]);

  useEffect(() => {
    if (!input) {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }
    // eslint-disable-next-line
  }, []);

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);

  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const onSubmit = useCallback(
    (formValues: QualificationLevelFormInput) => {
      onSave(
        input
          ? {
              ...input,
              ...formValues,
            }
          : formValues,
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
      title={`qualification_level.dialog.${input ? (readonly ? 'view' : 'update') : 'create'}.title`}
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
              {t(readonly ? 'core.button.close' : 'common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="ordering"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('qualification_level.field.ordering')}
                    error={!!errors.ordering}
                    helperText={errors.ordering?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="internalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('qualification_level.field.internal_code')}
                    error={!!errors.internalCode}
                    helperText={errors.internalCode?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('qualification_level.field.name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
