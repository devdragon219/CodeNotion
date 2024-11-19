import { yupResolver } from '@hookform/resolvers/yup';
import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, Form, SectionTitle } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ContractOneshotAdditionFormInput } from '../../../../../interfaces/FormInputs/Contract';
import { getEmptyContractOneshotAdditionFormInput } from '../../../../../utils/contract/initialValues';
import { getContractOneshotAdditionSchema } from '../../../../../utils/contract/schemas/oneshotAdditions';
import { OneshotAdditionField } from '../Field/Field';
import { OneshotAdditionDialogProps } from './Dialog.types';

export const OneshotAdditionDialog = ({ input, onClose, onSave }: OneshotAdditionDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ContractOneshotAdditionFormInput>({
    defaultValues: input ? input.oneshotAddition : getEmptyContractOneshotAdditionFormInput(),
    resolver: yupResolver(getContractOneshotAdditionSchema(language, t)),
  });

  const onSubmit = useCallback(
    (formValues: ContractOneshotAdditionFormInput) => {
      onSave(
        input
          ? {
              ...input,
              oneshotAddition: formValues,
            }
          : formValues,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`contract.dialog.oneshot_addition.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <SectionTitle value="contract.section_title.oneshot_addition" />
            <Grid2 size={12}>
              <OneshotAdditionField control={control} errors={errors} />
            </Grid2>
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
