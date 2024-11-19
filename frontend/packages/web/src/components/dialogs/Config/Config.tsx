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
import { ConfigFunction } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ConfigFormInput } from '../../../interfaces/FormInputs/Config';
import { getConfigSchema } from '../../../utils/config/schemas/config';
import { ConfigDialogProps } from './Config.types';

export const ConfigDialog = ({ input, readonly, onClose, onSave }: ConfigDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
  } = useForm<ConfigFormInput>({
    defaultValues: input,
    resolver: yupResolver(getConfigSchema(t)),
  });

  const openCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(true);
  }, []);

  const closeCloseConfirmationDialog = useCallback(() => {
    setCloseConfirmationDialogOpen(false);
  }, []);

  const onSubmit = useCallback(
    (formValues: ConfigFormInput) => {
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
      title={`config.dialog.${readonly ? 'view' : 'update'}.title`}
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
              {t(readonly ? 'core.button.close' : 'config.dialog.update.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <SelectField
                label={t('config.field.function')}
                options={Object.values(ConfigFunction)}
                getOptionLabel={(option) => t(`common.enum.config_function.${option}`)}
                value={input?.function}
                readonly={readonly}
                disabled
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('config.field.name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    readonly={readonly}
                    disabled
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('config.field.value')}
                    error={!!errors.value}
                    helperText={errors.value?.message}
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
