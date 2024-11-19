import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CostChargeFormInput } from '../../../../../interfaces/FormInputs/CostCharge';
import { getEmptyCostChargeConsumptionFormInput } from '../../../../../utils/costCharge/initialValues';
import { getCostChargeConsumptionsSchema } from '../../../../../utils/costCharge/schemas/generalData';
import { CostChargeConsumptionField } from '../Field/Field';
import { CostChargeConsumptionDialogProps } from './Dialog.types';

export const CostChargeConsumptionDialog = ({
  input,
  measurementUnit,
  periodEnd,
  periodStart,
  timeOfUseRateCount,
  type,
  onClose,
  onSave,
}: CostChargeConsumptionDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CostChargeFormInput>({
    defaultValues: {
      consumptions: {
        actual:
          type === 'actual'
            ? (input.actual ?? getEmptyCostChargeConsumptionFormInput(timeOfUseRateCount))
            : input.actual,
        expected:
          type === 'expected'
            ? (input.expected ?? getEmptyCostChargeConsumptionFormInput(timeOfUseRateCount))
            : input.expected,
      },
      periodEnd,
      periodStart,
    },
    resolver: yupResolver(getCostChargeConsumptionsSchema(language, t, type)),
  });

  const onSubmit = useCallback(
    ({ consumptions }: CostChargeFormInput) => {
      onSave(consumptions);
    },
    [onSave],
  );

  return (
    <Dialog
      open
      onClose={onClose}
      title={`cost_charge.dialog.consumption.${input[type] !== null ? 'edit' : 'add'}.${type}`}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value={`cost_charge.section_title.${type}_consumption`} />
            <Grid2 size={12}>
              <CostChargeConsumptionField
                control={control}
                errors={errors}
                measurementUnit={measurementUnit}
                type={type}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
