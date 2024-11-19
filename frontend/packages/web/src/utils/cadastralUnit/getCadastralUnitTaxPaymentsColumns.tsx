import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { parseDateToLocalizedString, parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { ReactElement } from 'react';

import { CadastralUnitTaxPaymentFormInput } from '../../interfaces/FormInputs/CadastralUnit';

const getDownPayments = (row: CadastralUnitTaxPaymentFormInput) =>
  row.installments.filter((installment) => !installment.installmentsPaid.includes(row.expectedInstallments - 1));

const getPayment = (row: CadastralUnitTaxPaymentFormInput) =>
  row.installments.find((installment) => installment.installmentsPaid.includes(row.expectedInstallments - 1));

export const getCadastralUnitTaxPaymentsColumns = (
  showAll: (row: CadastralUnitTaxPaymentFormInput) => ReactElement,
  language: string,
): TableColumn<CadastralUnitTaxPaymentFormInput>[] => [
  {
    id: 'year',
    type: 'number',
    label: 'cadastral_unit.field.year',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'taxName',
    label: 'cadastral_unit.field.tax_name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.taxCalculator,
  },
  {
    id: 'downPaymentAmount',
    label: 'cadastral_unit.field.down_payment_amount',
    getRowValue: (row) => {
      const downPayments = getDownPayments(row);

      if (downPayments.length === 0) return '-';

      if (downPayments.length === 1)
        return downPayments[0].amountPaid ? parseNumberToCurrency(downPayments[0].amountPaid, language) : '-';

      return showAll(row);
    },
  },
  {
    id: 'downPaymentDate',
    label: 'cadastral_unit.field.down_payment_date',
    getRowValue: (row) => {
      const downPayments = getDownPayments(row);

      if (downPayments.length === 0) return '-';

      if (downPayments.length === 1) return parseDateToLocalizedString(downPayments[0].date, language);

      return showAll(row);
    },
  },
  {
    id: 'paymentAmount',
    type: 'currency',
    label: 'cadastral_unit.field.payment_amount',
    enableColumnFilter: true,
    enableSorting: true,
    getRowValue: (row) => getPayment(row)?.amountPaid,
  },
  {
    id: 'paymentDate',
    type: 'date',
    label: 'cadastral_unit.field.payment_date',
    enableColumnFilter: true,
    filterFn: 'inDateRange',
    enableSorting: true,
    getRowValue: (row) => getPayment(row)?.date ?? null,
  },
  {
    id: 'totalAmount',
    type: 'currency',
    label: 'cadastral_unit.field.total_amount',
    enableColumnFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.installments.reduce((total, curr) => total + curr.amountPaid, 0),
  },
];
