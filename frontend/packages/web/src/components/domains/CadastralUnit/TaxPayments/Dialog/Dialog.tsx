import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CadastralUnitTaxDownPaymentsDialogProps } from './Dialog.types';

export const CadastralUnitTaxDownPaymentsDialog = ({
  taxPayment,
  onClose,
}: CadastralUnitTaxDownPaymentsDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const taxDetail = useMemo(() => (taxPayment ? `${taxPayment.taxCalculator} ${taxPayment.year}` : ''), [taxPayment]);
  const title = useMemo(() => t('cadastral_unit.dialog.down_payments.title', { taxDetail }), [taxDetail, t]);

  const rows = useMemo(() => {
    if (!taxPayment) return [];

    const downPayments = taxPayment.installments.filter(
      (installment) => !installment.installmentsPaid.includes(taxPayment.expectedInstallments - 1),
    );

    return downPayments.map(({ amountPaid, date }) => [parseNumberToCurrency(amountPaid, language), date]);
  }, [taxPayment, language]);

  return (
    <Dialog fullScreen open title={title as ParseKeys} onClose={onClose}>
      <DialogContent>
        <SecondaryTable
          columns={['cadastral_unit.field.down_payment', 'cadastral_unit.field.down_payment_date']}
          rows={rows}
        />
      </DialogContent>
    </Dialog>
  );
};
