import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RegistrationPaymentFormInput } from '../../../../../interfaces/FormInputs/RegistrationPayment';
import { getEmptyRegistrationPaymentRowFormInput } from '../../../../../utils/registrationPayment/initialValues';
import { getRegistrationPaymentRowsSchema } from '../../../../../utils/registrationPayment/schemas/rows';
import { RegistrationPaymentRowField } from '../Field/Field';
import { RegistrationPaymentRowDialogProps } from './Dialog.types';

export const RegistrationPaymentRowDialog = ({
  input,
  referenceYear,
  onClose,
  onSave,
}: RegistrationPaymentRowDialogProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegistrationPaymentFormInput>({
    defaultValues: {
      rows: input ? [input.row] : [getEmptyRegistrationPaymentRowFormInput(referenceYear)],
    },
    resolver: yupResolver(getRegistrationPaymentRowsSchema(t)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rows',
  });

  const handleAddItem = useCallback(() => {
    append(getEmptyRegistrationPaymentRowFormInput(referenceYear));
  }, [append, referenceYear]);

  const onSubmit = useCallback(
    (formValues: RegistrationPaymentFormInput) => {
      onSave(
        input
          ? {
              ...input,
              row: formValues.rows[0],
            }
          : formValues.rows,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`registration_payment.dialog.row.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="registration_payment.section_title.rows" />
            {input ? (
              <Grid2 size={12}>
                <RegistrationPaymentRowField control={control} errors={errors} index={0} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <RegistrationPaymentRowField control={control} errors={errors} index={index} />
                        </RepeatableField>
                      ))}
                    </Stack>
                  </Grid2>
                )}
                <Grid2 size={12}>
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={handleAddItem}
                  >
                    {t('registration_payment.action.add_row')}
                  </Button>
                </Grid2>
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
