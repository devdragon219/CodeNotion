import { yupResolver } from '@hookform/resolvers/yup';
import { CancelOutlined, Warning } from '@mui/icons-material';
import { Button, Grid2, Typography } from '@mui/material';
import { ConfirmationDialog, DateField, Form, RadioGroupField, TextField } from '@realgimm5/frontend-common/components';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractBillingPauseFormInput } from '../../../../interfaces/FormInputs/ContractActions';
import { getEmptyContractBillingPauseFormInput } from '../../../../utils/contractActions/initialValues';
import { getContractBillingPauseSchema } from '../../../../utils/contractActions/schemas/billingPause';
import { ContractBillingPauseConfirmationDialogProps } from './BillingPause.types';

export const ContractBillingPauseConfirmationDialog = ({
  pausedSince,
  onClose,
  onSave,
}: ContractBillingPauseConfirmationDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const [step, setStep] = useState(0);
  const {
    control,
    formState: { errors },
    getValues,
    trigger,
  } = useForm<ContractBillingPauseFormInput>({
    defaultValues: getEmptyContractBillingPauseFormInput(),
    resolver: yupResolver(getContractBillingPauseSchema(pausedSince, language, t)),
  });

  const title = useMemo(
    (): ParseKeys =>
      `contract.dialog.billing_pause.title.${
        !pausedSince ? (step === 0 ? 'pausing' : 'pause') : step === 0 ? 'resuming' : 'resume'
      }`,
    [pausedSince, step],
  );
  const description = useMemo(
    (): ParseKeys =>
      `contract.dialog.billing_pause.description.${
        !pausedSince ? (step === 0 ? 'pausing' : 'pause') : step === 0 ? 'resuming' : 'resume'
      }`,
    [pausedSince, step],
  );

  const handleContinue = useCallback(() => {
    setStep(1);
  }, []);
  const handleSave = useCallback(async () => {
    const result = await trigger();
    if (result) {
      const values = getValues();
      onSave(values);
    }
  }, [getValues, onSave, trigger]);

  return (
    <ConfirmationDialog
      open
      onClose={onClose}
      type={pausedSince ? 'alert' : 'danger'}
      icon={pausedSince ? Warning : CancelOutlined}
      title={title}
      description={description}
      actions={
        <>
          <Button color="secondary" onClick={onClose}>
            {t('common.button.cancel')}
          </Button>
          {step === 0 ? (
            <Button color={pausedSince ? 'primary' : 'destructive'} onClick={handleContinue}>
              {t('common.button.continue')}
            </Button>
          ) : (
            <Button color={pausedSince ? 'primary' : 'destructive'} onClick={handleSave}>
              {t(`contract.dialog.billing_pause.action.${!pausedSince ? 'pause' : 'resume'}`)}
            </Button>
          )}
        </>
      }
    >
      <Form noValidate>
        {step !== 0 && (
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={12}>
              {!pausedSince ? (
                <Controller
                  name="since"
                  control={control}
                  render={({ field }) => (
                    <DateField
                      {...field}
                      label={t('contract.field.billing_pause_since')}
                      error={!!errors.since}
                      helperText={errors.since?.message}
                      required
                    />
                  )}
                />
              ) : (
                <Controller
                  name="until"
                  control={control}
                  render={({ field }) => (
                    <DateField
                      {...field}
                      label={t('contract.field.billing_pause_until')}
                      error={!!errors.until}
                      helperText={errors.until?.message}
                      required
                    />
                  )}
                />
              )}
            </Grid2>
            <Grid2 size={12}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    label={t('contract.field.notes')}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                  />
                )}
              />
            </Grid2>
            {pausedSince && (
              <>
                <Grid2 size={12}>
                  <Typography
                    variant="bodyLg"
                    sx={(theme) => ({ color: theme.palette.grey[700], whiteSpace: 'pre-wrap' })}
                  >
                    {t('contract.dialog.billing_pause.description.recover_arrears')}
                  </Typography>
                </Grid2>
                <Grid2 size={12}>
                  <Controller
                    name="isRecoveryArrears"
                    control={control}
                    render={({ field }) => (
                      <RadioGroupField
                        {...field}
                        row
                        options={[
                          {
                            label: t('common.text.true'),
                            value: true,
                          },
                          {
                            label: t('common.text.false'),
                            value: false,
                          },
                        ]}
                        error={!!errors.isRecoveryArrears}
                        helperText={errors.isRecoveryArrears?.message}
                      />
                    )}
                  />
                </Grid2>
              </>
            )}
          </Grid2>
        )}
      </Form>
    </ConfirmationDialog>
  );
};
