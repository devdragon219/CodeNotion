import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { useTranslation } from 'react-i18next';

import { ContractBillingPausesDialogProps } from './BillingPauses.types';

export const ContractBillingPausesDialog = ({ billingPauses, onClose }: ContractBillingPausesDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Dialog fullScreen open title="contract.dialog.billing_pauses" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'contract.field.billing_pause_since',
            'contract.field.billing_pause_until',
            'contract.field.billing_recover_after_suspension',
            'contract.field.notes',
          ]}
          rows={billingPauses.map((billingPause) => [
            parseStringToLocalizedDate(billingPause.since, language),
            parseStringToLocalizedDate(billingPause.until, language),
            billingPause.isRecoveryArrears,
            billingPause.notes,
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
