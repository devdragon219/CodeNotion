import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { TicketHistory } from '../../History/History';
import { HistoryDialogProps } from './History.types';

export const HistoryDialog = ({ history, onClose }: HistoryDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open onClose={onClose} title="ticket.dialog.quote_history">
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('common.button.save')}
          </Button>
        }
      >
        <TicketHistory history={history} />
      </DialogContent>
    </Dialog>
  );
};
