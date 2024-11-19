import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Dialog, DialogContent } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { AuditEventDialogProps } from './AuditEvent.types';

export const AuditEventDialog = ({ event, onClose }: AuditEventDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open title="audit_event.dialog.view" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(JSON.parse(event), null, '\t')}</Typography>
      </DialogContent>
    </Dialog>
  );
};
