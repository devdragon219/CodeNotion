import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';

import { ContractSecurityDepositInterestRowsDialogProps } from './SecurityDepositInterestRows.types';

export const ContractSecurityDepositInterestRowsDialog = ({
  interestRows,
  onClose,
}: ContractSecurityDepositInterestRowsDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Dialog fullScreen open title="contract.dialog.security_deposit_interest_rows" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'contract.field.security_deposit_interest_row_since',
            'contract.field.security_deposit_interest_row_until',
            'contract.field.security_deposit_interest_row_amount',
            'contract.field.security_deposit_interest_row_date',
            'contract.field.security_deposit_interest_row_interest',
          ]}
          rows={interestRows.map((interestRow) => [
            parseStringToLocalizedDate(interestRow.since, language),
            parseStringToLocalizedDate(interestRow.until, language),
            interestRow.baseAmount,
            parseStringToLocalizedDate(interestRow.calculationDate, language),
            interestRow.interestAmount,
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
