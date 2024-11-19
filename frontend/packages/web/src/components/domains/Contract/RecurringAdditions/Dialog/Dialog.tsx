import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractRecurringAdditionFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getEmptyContractRecurringAdditionFormInput } from '../../../../../utils/contract/initialValues';
import { getContractRecurringAdditionSchema } from '../../../../../utils/contract/schemas/recurringAdditions';
import { RecurringAdditionField } from '../Field/Field';
import { RecurringAdditionDialogProps } from './Dialog.types';

export const RecurringAdditionDialog = ({ input, onClose, onSave }: RecurringAdditionDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ContractRecurringAdditionFormInput>({
    defaultValues: input ? input.recurringAddition : getEmptyContractRecurringAdditionFormInput(),
    resolver: yupResolver(getContractRecurringAdditionSchema(t)),
  });

  const onSubmit = useCallback(
    (formValues: ContractRecurringAdditionFormInput) => {
      onSave(
        input
          ? {
              ...input,
              recurringAddition: formValues,
            }
          : formValues,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`contract.dialog.recurring_addition.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="contract.section_title.recurring_addition" />
            <Grid2 size={12}>
              <RecurringAdditionField control={control} errors={errors} />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
