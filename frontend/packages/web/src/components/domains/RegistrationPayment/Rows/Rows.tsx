import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Grid2, Stack } from '@mui/material';
import { EmptyText, RepeatableField, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RegistrationPaymentRowFormInput } from '../../../../interfaces/FormInputs/RegistrationPayment';
import { getEmptyRegistrationPaymentRowFormInput } from '../../../../utils/registrationPayment/initialValues';
import { RegistrationPaymentRowDialog } from './Dialog/Dialog';
import { RegistrationPaymentRowDialogInput } from './Dialog/Dialog.types';
import { RegistrationPaymentRowField } from './Field/Field';
import { RegistrationPaymentRowsProps } from './Rows.types';

export const RegistrationPaymentRows = ({ control, errors, mode, readonly }: RegistrationPaymentRowsProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const paymentYear = useWatch({ control, name: 'paymentYear' });
  const { fields, append, remove, update } = useFieldArray({ control, name: 'rows' });

  const [rowDialogProps, setRowDialogProps] = useState<{
    input?: RegistrationPaymentRowDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseRowDialog = useCallback(() => {
    setRowDialogProps({ open: false });
  }, []);
  const handleEditRow = useCallback(
    (index: number) => {
      setRowDialogProps({
        input: { row: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveRow = useCallback(
    (value: RegistrationPaymentRowFormInput[] | RegistrationPaymentRowDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.row);
      }
      handleCloseRowDialog();
    },
    [append, update, handleCloseRowDialog],
  );

  const handleAddRow = useCallback(() => {
    if (mode === FormMode.Create) {
      append(getEmptyRegistrationPaymentRowFormInput(paymentYear));
    } else {
      setRowDialogProps({ open: true });
    }
  }, [mode, append, paymentYear]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        actions={
          mode === FormMode.Edit && !readonly ? (
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddRow}>
              {t('registration_payment.action.add_row')}
            </Button>
          ) : undefined
        }
        value="registration_payment.section_title.rows"
      />
      {mode === FormMode.Create ? (
        <>
          <Grid2 size={12}>
            <Stack divider={<Divider flexItem />} spacing={{ xs: 2, sm: 3 }}>
              {fields.map(({ key }, index) => (
                <RepeatableField key={key} index={index} onDelete={remove}>
                  <RegistrationPaymentRowField control={control} errors={errors} index={index} />
                </RepeatableField>
              ))}
            </Stack>
          </Grid2>
          <Grid2 size={12}>
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddRow}>
              {t('registration_payment.action.add_row')}
            </Button>
          </Grid2>
        </>
      ) : fields.length === 0 && readonly ? (
        <EmptyText value="registration_payment.text.no_rows" />
      ) : (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'registration_payment.field.row_entity',
              'registration_payment.field.row_code',
              'registration_payment.field.row_description',
              'registration_payment.field.row_period',
              'registration_payment.field.row_year',
              'registration_payment.field.row_amount_due',
              'registration_payment.field.row_amount_cleared',
            ]}
            rows={fields.map((entry) => [
              entry.paymentRowReceivingEntity,
              entry.paymentRowCode,
              entry.paymentRowSection,
              entry.referencePeriod,
              entry.referenceYear,
              parseNumberToCurrency(entry.amountDue, language),
              parseNumberToCurrency(entry.amountCleared, language),
            ])}
            onRowDelete={readonly ? undefined : remove}
            onRowEdit={readonly ? undefined : handleEditRow}
          />
        </Grid2>
      )}
      {rowDialogProps.open && (
        <RegistrationPaymentRowDialog
          input={rowDialogProps.input}
          referenceYear={paymentYear}
          onClose={handleCloseRowDialog}
          onSave={handleSaveRow}
        />
      )}
    </Grid2>
  );
};
