import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircleOutline, CheckCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { Dialog, DialogContent, Form, RepeatableField, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectFormInput } from '../../../../../interfaces/FormInputs/Subject';
import { getEmptySubjectBankAccountFormInput } from '../../../../../utils/subject/initialValues';
import { getSubjectAccountingDataSchema } from '../../../../../utils/subject/schemas/accountingData';
import { BankAccountField } from '../Field/Field';
import { BankAccountDialogProps } from './Dialog.types';

export const BankAccountDialog = ({
  entryStatus,
  existingBankAccounts,
  input,
  required,
  onClose,
  onSave,
}: BankAccountDialogProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SubjectFormInput>({
    defaultValues: {
      bankAccounts: input ? [input.bankAccount] : [getEmptySubjectBankAccountFormInput()],
    },
    resolver: yupResolver(getSubjectAccountingDataSchema(entryStatus, language, t, existingBankAccounts)),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bankAccounts',
  });

  const handleAddBankAccount = useCallback(() => {
    append(getEmptySubjectBankAccountFormInput());
  }, [append]);

  const onSubmit = useCallback(
    (formValues: SubjectFormInput) => {
      onSave(
        input
          ? {
              ...input,
              bankAccount: formValues.bankAccounts[0],
            }
          : formValues.bankAccounts,
      );
    },
    [input, onSave],
  );

  return (
    <Dialog open onClose={onClose} title={`subject.dialog.bank_account.${input ? 'edit' : 'add'}`}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          action={
            <Button color="primary" variant="contained" type="submit" startIcon={<CheckCircleOutline />}>
              {t('common.button.save')}
            </Button>
          }
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={input ? undefined : { pr: 2 }}>
            <SectionTitle value="subject.section_title.bank_account" />
            {input ? (
              <Grid2 size={12}>
                <BankAccountField control={control} errors={errors} index={0} required={required} />
              </Grid2>
            ) : (
              <>
                {fields.length !== 0 && (
                  <Grid2 size={12}>
                    <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
                      {fields.map(({ key }, index) => (
                        <RepeatableField key={key} index={index} onDelete={remove}>
                          <BankAccountField control={control} errors={errors} index={index} required={required} />
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
                    onClick={handleAddBankAccount}
                  >
                    {t('subject.action.add_bank_account')}
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
