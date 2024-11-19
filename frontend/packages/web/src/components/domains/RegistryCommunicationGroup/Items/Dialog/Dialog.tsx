import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../../utils/addressUtils';
import { RegistryCommunicationEstateUnitsDialogProps } from './Dialog.types';

export const RegistryCommunicationEstateUnitsDialog = ({
  registryCommunication,
  onClose,
}: RegistryCommunicationEstateUnitsDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Dialog fullScreen open title="registry_communication.dialog.estate_units" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'registry_communication.field.estate_unit_name',
            'registry_communication.field.estate_unit_internal_code',
            'registry_communication.field.estate_unit_address',
          ]}
          rows={registryCommunication.estatesUnits.map(({ estateUnit }) => [
            estateUnit.name,
            estateUnit.internalCode,
            parseAddressToString(estateUnit.address, language),
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
