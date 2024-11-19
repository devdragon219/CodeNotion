import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { CloseDialog, Dialog, DialogContent, Form, TextField } from '@realgimm5/frontend-common/components';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCadastralLandCategory } from '../../../hooks/useCadastralLandCategory';
import { CadastralLandCategoryFormInput } from '../../../interfaces/FormInputs/CadastralLandCategory';
import { getEmptyCadastralLandCategoryFormInput } from '../../../utils/cadastralLandCategory/initialValues';
import { getCadastralLandCategorySchema } from '../../../utils/cadastralLandCategory/schemas/cadastralLandCategory';
import { CountryISOField } from '../../core/Fields/CountryISO/CountryISO';
import { CadastralLandCategoryDialogProps } from './CadastralLandCategory.types';

export const CadastralLandCategoryDialog = ({ input, readonly, onClose, onSave }: CadastralLandCategoryDialogProps) => {
  const { t } = useTranslation();
  const [isCloseConfirmationDialogOpen, setCloseConfirmationDialogOpen] = useState(false);
  const [canUseInternalCode, setCanUseInternalCode] = useState(true);
  const { checkCanUseInternalCode, getInternalCode } = useCadastralLandCategory();

  const {
    control,
    formState: { isValid: canSave, errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<CadastralLandCategoryFormInput>({
    defaultValues: input ?? getEmptyCadastralLandCategoryFormInput(),
    resolver: yupResolver(getCadastralLandCategorySchema(canUseInternalCode, t)),
  });

  const internalCode = useWatch({ control, name: 'internalCode' });
  const debouncedInternalCode = useDebounce(internalCode);
  const cadastralLandCategoryId = useWatch({ control, name: 'cadastralLandCategoryId' });
  const debouncedCadastralLandCategoryId = useDebounce(cadastralLandCategoryId);

  useEffect(() => {
    checkCanUseInternalCode(debouncedInternalCode, debouncedCadastralLandCategoryId, setCanUseInternalCode);
    // eslint-disable-next-line
  }, [debouncedInternalCode, debouncedCadastralLandCategoryId]);

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
    (formValues: CadastralLandCategoryFormInput) => {
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
      title={`cadastral_land_category.dialog.${input ? (readonly ? 'view' : 'update') : 'create'}.title`}
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
              {t(readonly ? 'core.button.close' : 'cadastral_land_category.dialog.create.save')}
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
                    label={t('cadastral_land_category.field.internal_code')}
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
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('cadastral_land_category.field.description')}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    readonly={readonly}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <Controller
                name="countryISO"
                control={control}
                render={({ field }) => (
                  <CountryISOField
                    {...field}
                    label={t('cadastral_land_category.field.country_iso')}
                    error={!!errors.countryISO}
                    helperText={errors.countryISO?.message}
                    required
                    readonly={readonly}
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
                    label={t('cadastral_land_category.field.ordering')}
                    error={!!errors.ordering}
                    helperText={errors.ordering?.message}
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
