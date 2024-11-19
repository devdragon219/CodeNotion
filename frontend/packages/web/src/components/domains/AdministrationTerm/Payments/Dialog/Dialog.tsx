import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdministrationTermFormInput } from '../../../../../interfaces/FormInputs/AdministrationTerm';
import { AdministrationTermPaymentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermPayment';
import { getEmptyAdministrationTermPaymentFormInput } from '../../../../../utils/administrationTerm/initialValues';
import { getAdministrationTermPaymentsSchema } from '../../../../../utils/administrationTerm/schemas/payments';
import { AdministrationTermPaymentFieldAccordion } from '../Accordion/Accordion';
import { AdministrationTermPaymentField } from '../Field/Field';
import { AdministrationTermPaymentsDialogProps } from './Dialog.types';

export const AdministrationTermPaymentsDialog = ({
  input,
  readonly,
  onClose,
  onSave,
  installments,
  existingPayments,
}: AdministrationTermPaymentsDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AdministrationTermFormInput>({
    defaultValues: {
      payments: input ? [input.payment] : [getEmptyAdministrationTermPaymentFormInput()],
    },
    resolver: yupResolver(getAdministrationTermPaymentsSchema(language, t)),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'payments',
  });

  const handleAddPayment = useCallback(() => {
    append(getEmptyAdministrationTermPaymentFormInput());
  }, [append]);
  const handleRemovePayment = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  const onSubmit = useCallback(
    (formValues: { payments: AdministrationTermPaymentFormInput[] }) => {
      onSave(
        input
          ? {
              ...input,
              payment: formValues.payments[0],
            }
          : formValues.payments,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open title={`administration_term.dialog.payment.${input ? 'edit' : 'add'}`} onClose={onClose}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button
              color="primary"
              variant="contained"
              startIcon={<CheckCircleOutline />}
              {...(readonly ? { onClick: onClose } : { type: 'submit' })}
            >
              {t(readonly ? 'core.button.close' : `administration_term.dialog.payment.${input ? 'edit' : 'add'}`)}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            {input ? (
              <Grid2 size={12}>
                <Controller
                  name="payments.0"
                  control={control}
                  render={({ field }) => (
                    <AdministrationTermPaymentField
                      {...field}
                      errors={errors.payments?.[0]}
                      installments={installments}
                      existingPayments={existingPayments}
                    />
                  )}
                />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={handleRemovePayment}>
                          <Controller
                            name={`payments.${index}`}
                            control={control}
                            render={({ field }) => (
                              <AdministrationTermPaymentFieldAccordion
                                {...field}
                                payments={fields}
                                index={index}
                                errors={errors.payments?.[index]}
                                installments={installments}
                                existingPayments={existingPayments}
                              />
                            )}
                          />
                        </RepeatableField>
                      ))}
                    </Stack>
                  </Grid2>
                )}
                {!readonly && (
                  <Grid2 size={12}>
                    <Button
                      color="secondary"
                      variant="contained"
                      startIcon={<AddCircleOutline />}
                      onClick={handleAddPayment}
                    >
                      {t('administration_term.action.add_payment')}
                    </Button>
                  </Grid2>
                )}
              </>
            )}
          </Grid2>
        </DialogContent>
      </Form>
    </Dialog>
  );
};
