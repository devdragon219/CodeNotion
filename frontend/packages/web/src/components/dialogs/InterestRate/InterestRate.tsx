import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { CloseDialog, DateField, Dialog, DialogContent, Form, TextField } from '@realgimm5/frontend-common/components';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InterestRateFormInput } from '../../../interfaces/FormInputs/InterestRate';
import { getEmptyInterestRateFormInput } from '../../../utils/interestRate/initialValues';
import { getInterestRateSchema } from '../../../utils/interestRate/schemas/interestRate';
import { InterestRateDialogProps } from './InterestRate.types';

export const InterestRateDialog = ({ input, readonly, onClose, onSave }: InterestRateDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
  } = useForm<InterestRateFormInput>({
    defaultValues: input ?? getEmptyInterestRateFormInput(),
    resolver: yupResolver(getInterestRateSchema(language, t)),
  });

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);

  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const onSubmit = useCallback(
    (formValues: InterestRateFormInput) => {
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
      title={`interest_rate.dialog.${input ? (readonly ? 'view' : 'update') : 'create'}.title`}
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
              {t(readonly ? 'core.button.close' : 'interest_rate.dialog.create.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="since"
                control={control}
                render={({ field }) => (
                  <DateField
                    {...field}
                    label={t('interest_rate.field.since')}
                    error={!!errors.since}
                    helperText={errors.since?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="until"
                control={control}
                render={({ field }) => (
                  <DateField
                    {...field}
                    label={t('interest_rate.field.until')}
                    error={!!errors.until}
                    helperText={errors.until?.message}
                    readonly={readonly}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="rate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    maxLength={3}
                    label={t('interest_rate.field.rate')}
                    error={!!errors.rate}
                    helperText={errors.rate?.message}
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
