import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  CurrencyField,
  Dialog,
  DialogContent,
  Form,
  SectionTitle,
  TextField,
} from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityContractTermExtensionFormInput } from '../../../../../interfaces/FormInputs/FacilityContract';
import { getEmptyFacilityContractTermExtensionFormInput } from '../../../../../utils/facilityContract/initialValues';
import { getFacilityContractTermExtensionSchema } from '../../../../../utils/facilityContract/schemas/termExtensions';
import { TermExtensionDialogProps } from './Dialog.types';

export const TermExtensionDialog = ({ input, onClose, onSave }: TermExtensionDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FacilityContractTermExtensionFormInput>({
    defaultValues: input?.termExtension ?? getEmptyFacilityContractTermExtensionFormInput(),
    resolver: yupResolver(getFacilityContractTermExtensionSchema(t)),
  });

  const onSubmit = useCallback(
    (formValues: FacilityContractTermExtensionFormInput) => {
      onSave(
        input
          ? {
              ...input,
              termExtension: formValues,
            }
          : formValues,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`facility_contract.dialog.${input ? 'edit' : 'add'}_term_extension`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="facility_contract.section_title.term_extensions" />
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="daysCount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label={t('facility_contract.field.term_extension_days')}
                    error={!!errors.daysCount?.message}
                    helperText={errors.daysCount?.message}
                    required
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="feeDifference"
                control={control}
                render={({ field }) => (
                  <CurrencyField
                    {...field}
                    label={t('facility_contract.field.term_extension_fee')}
                    error={!!errors.feeDifference?.message}
                    helperText={errors.feeDifference?.message}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t('facility_contract.field.term_extension_notes')}
                    error={!!errors.notes?.message}
                    helperText={errors.notes?.message}
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
