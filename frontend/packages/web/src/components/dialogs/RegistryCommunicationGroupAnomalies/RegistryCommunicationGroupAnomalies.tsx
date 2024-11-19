import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent } from '@realgimm5/frontend-common/components';
import { TableProvider } from '@realgimm5/frontend-common/contexts';
import { useTranslation } from 'react-i18next';

import { RegistryCommunicationGroupAnomaliesTable } from '../../tables/RegistryCommunicationGroupAnomalies/RegistryCommunicationGroupAnomalies';
import { RegistryCommunicationGroupAnomaliesDialogProps } from './RegistryCommunicationGroupAnomalies.types';

export const RegistryCommunicationGroupAnomaliesDialog = ({
  groupId,
  onClose,
}: RegistryCommunicationGroupAnomaliesDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog fullScreen open title="registry_communication.dialog.anomalies" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <TableProvider
          key="registry-communication-group-anomalies"
          initialState={{
            sorting: [
              {
                desc: false,
                id: 'contractInternalCode',
              },
            ],
          }}
        >
          <RegistryCommunicationGroupAnomaliesTable groupId={groupId} />
        </TableProvider>
      </DialogContent>
    </Dialog>
  );
};
