import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  CheckboxField,
  DateField,
  Dialog,
  DialogContent,
  Form,
  SectionTitle,
  SelectField,
} from '@realgimm5/frontend-common/components';
import { ReleaseReason } from '@realgimm5/frontend-common/gql/types';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractReleaseFormInput } from '../../../../interfaces/FormInputs/ContractActions';
import { getEmptyContractReleaseFormInput } from '../../../../utils/contractActions/initialValues';
import { getContractReleaseSchema } from '../../../../utils/contractActions/schemas/release';
import { ContractReleaseDialogProps } from './Release.types';

export const ContractReleaseDialog = ({ onClose, onSave }: ContractReleaseDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ContractReleaseFormInput>({
    defaultValues: getEmptyContractReleaseFormInput(),
    resolver: yupResolver(getContractReleaseSchema(language, t)),
  });
  const isOccupiedWithoutRight = useWatch({ control, name: 'isOccupiedWithoutRight' });
  const date = useWatch({ control, name: 'date' });
  const reason = useWatch({ control, name: 'reason' });

  return (
    <Dialog open onClose={onClose} title="contract.dialog.release_contract">
      <Form noValidate onSubmit={handleSubmit(onSave)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} type="submit">
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="contract.section_title.release_contract" />
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DateField
                    {...field}
                    label={t('contract.field.release_date')}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                    clearable={isOccupiedWithoutRight && !!reason}
                    required={!isOccupiedWithoutRight || !reason}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    options={Object.values(ReleaseReason)}
                    getOptionLabel={(option) => t(`common.enum.release_reason.${option}`)}
                    label={t('contract.field.release_reason')}
                    error={!!errors.reason}
                    helperText={errors.reason?.message}
                    clearable={isOccupiedWithoutRight && !!date}
                    required={!isOccupiedWithoutRight || !date}
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Controller
                name="isOccupiedWithoutRight"
                control={control}
                render={({ field }) => (
                  <CheckboxField
                    {...field}
                    label={t('contract.field.occupied_without_rights')}
                    error={!!errors.isOccupiedWithoutRight}
                    helperText={errors.isOccupiedWithoutRight?.message}
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
