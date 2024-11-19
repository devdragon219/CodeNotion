import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { CurrencyField, EmptyText, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BillRowFormInput } from '../../../../interfaces/FormInputs/Bill';
import {
  calcBillRowsTotalAmount,
  calcBillRowsTotalIncome,
  calcBillRowsTotalVat,
  getBillRowsVatRates,
} from '../../../../utils/bill/calcBillRowsTotals';
import { BillAccountingDataProps } from './AccountingData.types';
import { BillRowDialog } from './Dialog/Dialog';
import { BillRowDialogInput } from './Dialog/Dialog.types';

export const BillAccountingData = ({ control, readonly }: BillAccountingDataProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'billRows' });
  const totalIncome = useMemo(() => calcBillRowsTotalIncome(fields), [fields]);
  const totalVat = useMemo(() => calcBillRowsTotalVat(fields), [fields]);
  const totalAmount = useMemo(() => calcBillRowsTotalAmount(fields), [fields]);
  const vatRates = useMemo(() => getBillRowsVatRates(fields), [fields]);

  const [billRowDialogProps, setBillRowDialogProps] = useState<{
    input?: BillRowDialogInput;
    open: boolean;
  }>({ open: false });

  const handleCloseBillRowDialog = useCallback(() => {
    setBillRowDialogProps({ open: false });
  }, []);
  const handleEditBillRow = useCallback(
    (index: number) => {
      setBillRowDialogProps({
        input: { billRow: fields[index], index },
        open: true,
      });
    },
    [fields],
  );
  const handleSaveBillRow = useCallback(
    (value: BillRowFormInput[] | BillRowDialogInput) => {
      if (Array.isArray(value)) {
        append(value);
      } else {
        update(value.index, value.billRow);
      }
      handleCloseBillRowDialog();
    },
    [append, update, handleCloseBillRowDialog],
  );

  const handleAddBillRow = useCallback(() => {
    setBillRowDialogProps({ open: true });
  }, []);
  const handleRemoveBillRow = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="bill.section_title.totals" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CurrencyField value={totalIncome} label={t('bill.field.total_income')} readonly={readonly} disabled />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CurrencyField value={totalVat} label={t('bill.field.total_vat')} readonly={readonly} disabled />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CurrencyField value={totalAmount} label={t('bill.field.total_amount')} readonly={readonly} disabled />
      </Grid2>
      <SectionTitle
        actions={
          !readonly ? (
            <Button color="secondary" variant="contained" startIcon={<AddCircleOutline />} onClick={handleAddBillRow}>
              {t('bill.action.add_bill_row')}
            </Button>
          ) : undefined
        }
        value="bill.section_title.bill_rows"
      />
      {fields.length === 0 && readonly ? (
        <EmptyText value="bill.text.no_bill_rows" />
      ) : (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'bill.field.bill_row_item_type',
              'bill.field.bill_row_since',
              'bill.field.bill_row_until',
              'bill.field.bill_row_amount',
              'bill.field.bill_row_vat_code',
              'bill.field.bill_row_accounting_item',
            ]}
            rows={fields.map((field) => [
              field.billItemType?.description,
              field.since,
              field.until,
              parseNumberToCurrency(field.amount, language),
              field.vatRate?.internalCode,
              field.billItemType?.accountingItemInternalCode,
            ])}
            onRowDelete={readonly ? undefined : handleRemoveBillRow}
            onRowEdit={readonly ? undefined : handleEditBillRow}
          />
        </Grid2>
      )}
      {billRowDialogProps.open && (
        <BillRowDialog input={billRowDialogProps.input} onClose={handleCloseBillRowDialog} onSave={handleSaveBillRow} />
      )}
      <SectionTitle value="bill.section_title.vat_rates" />
      {vatRates.length === 0 ? (
        <EmptyText value="bill.text.no_vat_rates" />
      ) : (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'bill.field.bill_row_vat_code',
              'bill.field.bill_row_vat_description',
              'bill.field.bill_row_vat_percent',
              'bill.field.bill_row_amount',
              'bill.field.bill_row_vat',
            ]}
            rows={vatRates.map((field) => [
              field.internalCode,
              field.description,
              field.ratePercent,
              parseNumberToCurrency(field.amount, language),
              parseNumberToCurrency(field.vat, language),
            ])}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
