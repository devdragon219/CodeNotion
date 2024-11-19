import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import {
  CheckboxField,
  DateField,
  EmptyText,
  RepeatableField,
  SecondaryTable,
  SectionTitle,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EntryStatus, TaxStatusType } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { ChangeEvent, useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubjectBankAccountFormInput, SubjectTaxStatusFormInput } from '../../../../interfaces/FormInputs/Subject';
import {
  getEmptySubjectBankAccountFormInput,
  getEmptySubjectTaxStatusFormInput,
} from '../../../../utils/subject/initialValues';
import { SubjectAccountingDataProps } from './AccountingData.types';
import { BankAccountDialog } from './Dialog/Dialog';
import { BankAccountDialogInput } from './Dialog/Dialog.types';
import { BankAccountField } from './Field/Field';

export const SubjectAccountingData = ({ control, errors, mode, readonly }: SubjectAccountingDataProps) => {
  const { t } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'bankAccounts' });
  const entryStatus = useWatch({ control, name: 'entryStatus' });
  const [bankAccountDialogProps, setBankAccountDialogProps] = useState<{
    input?: BankAccountDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseBankAccountDialog = useCallback(() => {
    setBankAccountDialogProps({ open: false });
  }, []);
  const handleEditBankAccount = useCallback(
    (index: number) => {
      setBankAccountDialogProps({ input: { bankAccount: fields[index], index }, open: true });
    },
    [fields],
  );
  const handleSaveBankAccount = useCallback(
    (value: SubjectBankAccountFormInput[] | BankAccountDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.bankAccount);
      }
      handleCloseBankAccountDialog();
    },
    [append, update, handleCloseBankAccountDialog],
  );

  const handleAddBankAccount = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptySubjectBankAccountFormInput());
    } else {
      setBankAccountDialogProps({ open: true });
    }
  }, [mode, append]);

  const handleCheckboxChange = useCallback(
    (onChange: (value: SubjectTaxStatusFormInput | null) => void) =>
      (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (checked) {
          onChange(getEmptySubjectTaxStatusFormInput(TaxStatusType.ApplySplitPayment));
        } else {
          onChange(null);
        }
      },
    [],
  );

  const handleDateChange = useCallback(
    (
      key: keyof SubjectTaxStatusFormInput,
      input: SubjectTaxStatusFormInput | null,
      onChange: (value: SubjectTaxStatusFormInput | null) => void,
    ) =>
      (value: Date | null) => {
        if (input) {
          onChange({
            ...input,
            [key]: value,
          });
        }
      },
    [],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="subject.section_title.bank_account" />
      {fields.length !== 0 ? (
        <Grid2 size={12}>
          {mode === FormMode.Create ? (
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.map(({ key }, index) => (
                <RepeatableField key={key} index={index} onDelete={remove}>
                  <BankAccountField
                    control={control}
                    errors={errors}
                    index={index}
                    required={entryStatus !== EntryStatus.IncompleteDraft}
                  />
                </RepeatableField>
              ))}
            </Stack>
          ) : (
            <SecondaryTable
              columns={[
                'subject.field.bank_account_number',
                'subject.field.bank_account_holder',
                'subject.field.bank_account_notes',
              ]}
              rows={fields.map((entry) => [entry.referenceCode, entry.accountHolder, entry.notes])}
              onRowDelete={readonly ? undefined : remove}
              onRowEdit={readonly ? undefined : handleEditBankAccount}
            />
          )}
        </Grid2>
      ) : mode === FormMode.Edit ? (
        <EmptyText value="subject.text.no_bank_accounts" />
      ) : (
        <></>
      )}
      {bankAccountDialogProps.open && (
        <BankAccountDialog
          entryStatus={entryStatus!}
          existingBankAccounts={fields.filter((_, index) => index !== bankAccountDialogProps.input?.index)}
          input={bankAccountDialogProps.input}
          required={entryStatus !== EntryStatus.IncompleteDraft}
          onClose={handleCloseBankAccountDialog}
          onSave={handleSaveBankAccount}
        />
      )}
      {!readonly && (
        <Grid2 size={12}>
          <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddBankAccount}>
            {t('subject.action.add_bank_account')}
          </Button>
        </Grid2>
      )}
      <SectionTitle value="subject.section_title.split_payment" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="taxStatusSplitPayment"
          control={control}
          render={({ field }) => (
            <CheckboxField
              label={t('subject.field.tax_status_split_payment')}
              checked={!!field.value}
              readonly={readonly}
              onChange={handleCheckboxChange(field.onChange)}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="taxStatusSplitPayment"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              value={field.value?.since ?? null}
              label={t('subject.field.tax_status_split_payment_since')}
              readonly={readonly}
              error={!!errors.taxStatusSplitPayment?.since}
              helperText={errors.taxStatusSplitPayment?.since?.message}
              disabled={!field.value}
              onChange={handleDateChange('since', field.value, field.onChange)}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="taxStatusSplitPayment"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              value={field.value?.until ?? null}
              label={t('subject.field.tax_status_split_payment_until')}
              readonly={readonly}
              error={!!errors.taxStatusSplitPayment?.until}
              helperText={errors.taxStatusSplitPayment?.until?.message}
              disabled={!field.value}
              onChange={handleDateChange('until', field.value, field.onChange)}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
