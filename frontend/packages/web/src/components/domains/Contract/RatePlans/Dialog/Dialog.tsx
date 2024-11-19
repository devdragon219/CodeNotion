import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractRatePlanFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getEmptyContractRatePlanFormInput } from '../../../../../utils/contract/initialValues';
import { getContractRatePlanSchema } from '../../../../../utils/contract/schemas/ratePlans';
import { RatePlanField } from '../Field/Field';
import { RatePlanDialogProps } from './Dialog.types';

export const RatePlanDialog = ({ input, onClose, onSave }: RatePlanDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ContractRatePlanFormInput>({
    defaultValues: input ? input.ratePlan : getEmptyContractRatePlanFormInput(),
    resolver: yupResolver(getContractRatePlanSchema(language, t)),
  });

  const onSubmit = useCallback(
    (formValues: ContractRatePlanFormInput) => {
      onSave(
        input
          ? {
              ...input,
              ratePlan: formValues,
            }
          : formValues,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`contract.dialog.rate_plan.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="contract.section_title.rate_plan" />
            <Grid2 size={12}>
              <RatePlanField control={control} errors={errors} />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
