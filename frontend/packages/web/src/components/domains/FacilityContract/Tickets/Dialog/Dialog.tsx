import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useTranslation } from 'react-i18next';

import { TicketsHistoryDialogProps } from './Dialog.types';
import { TicketsHistoryTable } from './Table/Table';

export const TicketsHistoryDialog = ({ facilityContractId, onClose }: TicketsHistoryDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog fullScreen open title="facility_contract.dialog.tickets_history" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <TableProvider key="tickets">
          <TicketsHistoryTable facilityContractId={facilityContractId} />
        </TableProvider>
      </DialogContent>
    </Dialog>
  );
};
