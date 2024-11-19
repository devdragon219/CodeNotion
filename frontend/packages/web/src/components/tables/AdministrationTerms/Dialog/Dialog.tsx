import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { AdministrationTermInstallmentsTable } from '../../../domains/AdministrationTerm/InstallmentsTable/InstallmentsTable';
import { AdministrationTermTableInstallmentsDialogProps } from './Dialog.types';

export const AdministrationTermTableInstallmentsDialog = ({
  installments,
  onClose,
}: AdministrationTermTableInstallmentsDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog fullScreen open title="administration_term.dialog.installment.view" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <AdministrationTermInstallmentsTable installments={installments} />
      </DialogContent>
    </Dialog>
  );
};
