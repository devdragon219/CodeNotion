import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { AsstAddressType } from '@realgimm5/frontend-common/gql/types';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { UtilityServiceEstatesDialogProps } from './EstatesDialog.types';

export const UtilityServiceEstatesDialog = ({ estates, onClose }: UtilityServiceEstatesDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Dialog fullScreen open title="utility_service.tab.estates" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'utility_service.field.estate_code',
            'utility_service.field.estate_name',
            'utility_service.field.estate_type',
            'utility_service.field.address_toponymy',
            'utility_service.field.estate_status',
            'utility_service.field.estate_usage_type',
            'utility_service.field.estate_management_subject',
          ]}
          rows={estates.map((estate) => [
            estate.internalCode,
            estate.name,
            t(`common.enum.estate_type.${estate.type}`),
            parseAddressToString(
              estate.addresses.find(({ addressType }) => addressType === AsstAddressType.Primary),
              language,
            ),
            t(`common.enum.estate_status.${estate.status}`),
            estate.usageType.name,
            estate.managementSubject.name,
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
