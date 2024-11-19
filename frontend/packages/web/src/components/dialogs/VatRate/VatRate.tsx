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
import { VatRateType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useVatRate } from '../../../hooks/useVatRate';
import { VatRateFormInput } from '../../../interfaces/FormInputs/VatRate';
import { getEmptyVatRateFormInput } from '../../../utils/vatRate/initialValues';
import { getVatRateSchema } from '../../../utils/vatRate/schemas/vatRate';
import { VatRateDialogProps } from './VatRate.types';

export const VatRateDialog = ({ input, readonly, onClose, onSave }: VatRateDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const { getInternalCode, checkCanUseInternalCode } = useVatRate();
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    setValue,
    getValues,
    resetField,
  } = useForm<VatRateFormInput>({
    defaultValues: input ?? getEmptyVatRateFormInput(),
    resolver: yupResolver(getVatRateSchema(canUseInternalCode, t)),
  });
  const internalCode = useWatch({ control, name: 'internalCode' });
  const vatRateId = useWatch({ control, name: 'vatRateId' });
  const debouncedInternalCode = useDebounce(internalCode);
  const debouncedVatRateId = useDebounce(vatRateId);
  const vatRateType = useWatch({ control, name: 'vatRateType' });

  useEffect(() => {
    checkCanUseInternalCode(debouncedInternalCode, debouncedVatRateId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedVatRateId]);

  useEffect(() => {
    if (!input) {
      getInternalCode((internalCode) => {
        setValue('internalCode', internalCode);
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleVatRateTypeChange = useCallback(
    (onChange: (value: VatRateType | null) => void) => (value: VatRateType | null) => {
      onChange(value);
      resetField('ratePercent');
      setValue('ratePercent', value !== VatRateType.Rate ? 0 : null);
    },
    [resetField, setValue],
  );

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);

  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const onSubmit = useCallback(
    (formValues: VatRateFormInput) => {
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
      title={`vat_rate.dialog.${input ? (readonly ? 'view' : 'update') : 'create'}.title`}
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
              {t(readonly ? 'core.button.close' : 'vat_rate.dialog.create.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="internalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('vat_rate.field.internal_code')}
                    error={!!errors.internalCode}
                    helperText={errors.internalCode?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('vat_rate.field.description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="vatRateType"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    onChange={handleVatRateTypeChange(field.onChange)}
                    label={t('vat_rate.field.type')}
                    options={Object.values(VatRateType)}
                    getOptionLabel={(option) => t(`common.enum.vat_rate_type.${option}`)}
                    error={!!errors.vatRateType}
                    helperText={errors.vatRateType?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <Controller
                name="ratePercent"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    maxLength={3}
                    label={t('vat_rate.field.rate_percent')}
                    error={!!errors.ratePercent}
                    helperText={errors.ratePercent?.message}
                    readonly={readonly || vatRateType !== VatRateType.Rate}
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
