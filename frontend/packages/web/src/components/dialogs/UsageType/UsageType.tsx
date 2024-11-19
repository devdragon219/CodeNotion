import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  CloseDialog,
  Dialog,
  DialogContent,
  Form,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UsageTypeApplicability } from '../../../enums/UsageTypeApplicability';
import { useUsageType } from '../../../hooks/useUsageType';
import { UsageTypeFormInput } from '../../../interfaces/FormInputs/UsageType';
import { getEmptyUsageTypeFormInput } from '../../../utils/usageType/initialValues';
import { getUsageTypeSchema } from '../../../utils/usageType/schemas/usageType';
import { UsageTypeDialogProps } from './UsageType.types';

export const UsageTypeDialog = ({ input, readonly, onClose, onSave }: UsageTypeDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const { checkCanUseInternalCode, getInternalCode } = useUsageType();

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<UsageTypeFormInput>({
    defaultValues: input ?? getEmptyUsageTypeFormInput(),
    resolver: yupResolver(getUsageTypeSchema(canUseInternalCode, t)),
  });

  const internalCode = useWatch({ control, name: 'internalCode' });
  const debouncedInternalCode = useDebounce(internalCode);
  const usageTypeId = useWatch({ control, name: 'usageTypeId' });
  const debouncedUsageTypeId = useDebounce(usageTypeId);

  useEffect(() => {
    checkCanUseInternalCode(debouncedInternalCode, debouncedUsageTypeId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedUsageTypeId]);

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
    (formValues: UsageTypeFormInput) => {
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
      title={`usage_type.dialog.${input ? (readonly ? 'view' : 'update') : 'create'}.title`}
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
              {t(readonly ? 'core.button.close' : 'usage_type.dialog.create.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Controller
                name="internalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('usage_type.field.internal_code')}
                    error={!!errors.internalCode}
                    helperText={errors.internalCode?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('usage_type.field.name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Controller
                name="ordering"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('usage_type.field.ordering')}
                    error={!!errors.ordering}
                    helperText={errors.ordering?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Controller
                name="applicability"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    multiple
                    label={t('usage_type.field.applicability')}
                    options={Object.values(UsageTypeApplicability)}
                    getOptionLabel={(option) => t(`core.enum.usage_type_applicability.${option}`)}
                    error={!!errors.applicability}
                    helperText={errors.applicability?.message}
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
