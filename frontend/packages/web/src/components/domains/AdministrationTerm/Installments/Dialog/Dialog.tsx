import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdministrationTermFormInput } from '../../../../../interfaces/FormInputs/AdministrationTerm';
import { AdministrationTermInstallmentFormInput } from '../../../../../interfaces/FormInputs/AdministrationTermInstallment';
import { getEmptyAdministrationTermInstallmentFormInput } from '../../../../../utils/administrationTerm/initialValues';
import { getAdministrationTermInstallmentsSchema } from '../../../../../utils/administrationTerm/schemas/installments';
import { AdministrationTermInstallmentFieldAccordion } from '../Accordion/Accordion';
import { AdministrationTermInstallmentField } from '../Field/Field';
import { AdministrationTermInstallmentsDialogProps } from './Dialog.types';

export const AdministrationTermInstallmentsDialog = ({
  input,
  readonly,
  onClose,
  onSave,
  termSince,
  termUntil,
  termExpectedAmount,
  existingInstallments,
}: AdministrationTermInstallmentsDialogProps) => {
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
      installments: input
        ? [input.installment]
        : [getEmptyAdministrationTermInstallmentFormInput(existingInstallments.length + 1)],
    },
    resolver: yupResolver(
      getAdministrationTermInstallmentsSchema(
        termSince,
        termUntil,
        termExpectedAmount,
        existingInstallments,
        language,
        t,
      ),
    ),
  });
  const { fields, append, replace } = useFieldArray({
    control,
    name: 'installments',
  });

  const handleAddInstallment = useCallback(() => {
    append(getEmptyAdministrationTermInstallmentFormInput(existingInstallments.length + fields.length + 1));
  }, [append, existingInstallments.length, fields.length]);

  const handleRemoveInstallment = useCallback(
    (index: number) => {
      replace(
        fields
          .filter((_, idx) => idx !== index)
          .map((installment, index) => ({
            ...installment,
            installmentNumber: existingInstallments.length + index + 1,
          })),
      );
    },
    [existingInstallments.length, fields, replace],
  );

  const onSubmit = useCallback(
    (formValues: { installments: AdministrationTermInstallmentFormInput[] }) => {
      onSave(
        input
          ? {
              ...input,
              installment: formValues.installments[0],
            }
          : formValues.installments,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog
      open
      title={`administration_term.dialog.installment.${input ? (readonly ? 'view' : 'edit') : 'add'}`}
      onClose={onClose}
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
              {t(readonly ? 'core.button.close' : `administration_term.dialog.installment.${input ? 'edit' : 'add'}`)}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            {input ? (
              <Grid2 size={12}>
                <Controller
                  name="installments.0"
                  control={control}
                  render={({ field }) => (
                    <AdministrationTermInstallmentField {...field} errors={errors.installments?.[0]} />
                  )}
                />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={handleRemoveInstallment}>
                          <Controller
                            name={`installments.${index}`}
                            control={control}
                            render={({ field }) => (
                              <AdministrationTermInstallmentFieldAccordion
                                {...field}
                                installments={fields}
                                index={index}
                                errors={errors.installments?.[index]}
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
                      onClick={handleAddInstallment}
                    >
                      {t('administration_term.action.add_installment')}
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
