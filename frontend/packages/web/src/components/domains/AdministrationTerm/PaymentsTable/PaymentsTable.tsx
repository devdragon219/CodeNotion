import { SecondaryTable } from '@realgimm5/frontend-common/components';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { calcGroupedInstallmentsTaxAmounts } from '../../../../utils/administrationTerm/calcTaxAmounts';
import { AdministrationTermPaymentsTableProps } from './PaymentsTable.types';

export const AdministrationTermPaymentsTable = ({
  installments,
  payments,
  onDelete,
  onEdit,
}: AdministrationTermPaymentsTableProps) => {
  const {
    i18n: { language },
  } = useTranslation();
  const rows = useMemo(
    () =>
      payments.map((payment) => {
        const { taxableAmount, taxAmount, totalAmount } = calcGroupedInstallmentsTaxAmounts(
          payment.installments,
          installments,
        );

        return [
          payment.installments
            .map((installment) => installments.find(({ guid }) => guid === installment)?.installmentNumber)
            .join(', '),
          payment.installments
            .map((installment) => installments.find(({ guid }) => guid === installment)?.billItemType?.description)
            .join(', '),
          payment.paymentDate,
          payment.billInternalCode,
          parseNumberToCurrency(taxableAmount, language),
          parseNumberToCurrency(taxAmount, language),
          parseNumberToCurrency(totalAmount, language),
        ];
      }),
    [installments, language, payments],
  );

  const canRowDelete = useCallback(
    (index: number) => {
      return payments[index].isBillTemporary;
    },
    [payments],
  );

  return (
    <SecondaryTable
      columns={[
        'administration_term.field.installments',
        'administration_term.field.expense_reason',
        'administration_term.field.payment_date',
        'administration_term.field.bill_internal_code',
        'administration_term.field.taxable_amount',
        'administration_term.field.tax',
        'administration_term.field.total_amount',
      ]}
      rows={rows}
      onRowDelete={onDelete}
      canRowDelete={canRowDelete}
      onRowEdit={onEdit}
    />
  );
};
