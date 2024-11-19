import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';

import { ContractRegistrationPaymentsDialogProps } from './RegistrationPayments.types';

export const ContractRegistrationPaymentsDialog = ({
  registrationPayments,
  onClose,
}: ContractRegistrationPaymentsDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Dialog fullScreen open title="contract.dialog.registration_payments" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'contract.field.registration_payment_type',
            'contract.field.registration_payment_year',
            'contract.field.registration_payment_code',
            'contract.field.registration_payment_date',
            'contract.field.registration_payment_tax_amount',
            'contract.field.registration_payment_sanction_amount',
            'contract.field.registration_payment_total_amount',
          ]}
          rows={registrationPayments.map((registrationPayment) => [
            t(`common.enum.registration_payment_type.${registrationPayment.paymentType}`),
            registrationPayment.paymentYear,
            registrationPayment.paymentCode,
            parseStringToLocalizedDate(registrationPayment.valueDate, language),
            registrationPayment.taxAmount,
            registrationPayment.sanctionAmount,
            registrationPayment.totalAmount,
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
