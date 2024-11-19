import { SecondaryTable } from '@realgimm5/frontend-common/components';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { calcTaxAmounts } from '../../../../utils/administrationTerm/calcTaxAmounts';
import { AdministrationTermInstallmentsTableProps } from './InstallmentsTable.types';

export const AdministrationTermInstallmentsTable = ({
  installments,
  payments,
  onDelete,
  onEdit,
}: AdministrationTermInstallmentsTableProps) => {
  const {
    i18n: { language },
  } = useTranslation();

  const canRowDelete = useCallback(
    (index: number) => {
      if (!payments) return true;
      const currentInstallmentGuid = installments[index].guid;
      return !payments.some((payment) => payment.installments.includes(currentInstallmentGuid));
    },
    [installments, payments],
  );

  return (
    <SecondaryTable
      columns={[
        'administration_term.field.installment_number',
        'administration_term.field.expense_reason',
        'administration_term.field.due_date',
        'administration_term.field.taxable_amount',
        'administration_term.field.tax',
        'administration_term.field.total_amount',
        'administration_term.field.installment_since',
        'administration_term.field.installment_until',
        'administration_term.field.notes',
      ]}
      rows={installments.map((installment) => [
        installment.installmentNumber,
        installment.billItemType?.description ?? '-',
        installment.dueDate,
        parseNumberToCurrency(installment.amount, language),
        parseNumberToCurrency(
          calcTaxAmounts(installment.amount ?? 0, installment.billItemType?.administrationVR?.ratePercent ?? 0)
            .taxAmount,
          language,
        ),
        parseNumberToCurrency(
          calcTaxAmounts(installment.amount ?? 0, installment.billItemType?.administrationVR?.ratePercent ?? 0)
            .totalAmount,
          language,
        ),
        installment.since,
        installment.until,
        installment.notes,
      ])}
      onRowDelete={onDelete}
      canRowDelete={canRowDelete}
      onRowEdit={onEdit}
    />
  );
};
