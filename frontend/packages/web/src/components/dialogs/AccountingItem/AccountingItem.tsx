import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { CloseDialog, Dialog, DialogContent, Form, TextField } from '@realgimm5/frontend-common/components';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAccountingItem } from '../../../hooks/useAccountingItem';
import { AccountingItemFormInput } from '../../../interfaces/FormInputs/AccountingItem';
import { getEmptyAccountingItemFormInput } from '../../../utils/accountingItem/initialValues';
import { getAccountingItemSchema } from '../../../utils/accountingItem/schemas/accountingItem';
import { AccountingItemDialogProps } from './AccountingItem.types';

export const AccountingItemDialog = ({ input, readonly, onClose, onSave }: AccountingItemDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);

  const { checkCanUseInternalCode, getInternalCode } = useAccountingItem();

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<AccountingItemFormInput>({
    defaultValues: input ?? getEmptyAccountingItemFormInput(),
    resolver: yupResolver(getAccountingItemSchema(canUseInternalCode, t)),
  });

  const internalCode = useWatch({ control, name: 'internalCode' });
  const debouncedInternalCode = useDebounce(internalCode);
  const accountingItemId = useWatch({ control, name: 'accountingItemId' });
  const debouncedAccountingItemId = useDebounce(accountingItemId);

  useEffect(() => {
    checkCanUseInternalCode(debouncedInternalCode, debouncedAccountingItemId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedAccountingItemId]);

  useEffect(() => {
    if (internalCode === '') {
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
    (formValues: AccountingItemFormInput) => {
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
      title={`accounting_item.dialog.${input ? (readonly ? 'view' : 'update') : 'create'}.title`}
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
              {t(readonly ? 'core.button.close' : 'accounting_item.dialog.create.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="internalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('accounting_item.field.internal_code')}
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
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="externalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('accounting_item.field.external_code')}
                    error={!!errors.externalCode}
                    helperText={errors.externalCode?.message}
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
