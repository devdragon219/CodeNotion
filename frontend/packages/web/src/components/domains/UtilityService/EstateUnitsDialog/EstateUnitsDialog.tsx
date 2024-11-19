import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { parseCadastralCoordinatesToString } from '../../../../utils/cadastralUnit/parseCadastralCoordinatesToString';
import { UtilityServiceEstateUnitsDialogProps } from './EstateUnitsDialog.types';

export const UtilityServiceEstateUnitsDialog = ({ estateUnits, onClose }: UtilityServiceEstateUnitsDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Dialog fullScreen open title="utility_service.tab.estate_units" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'utility_service.field.estate_unit_code',
            'utility_service.field.estate_unit_name',
            'utility_service.field.estate_unit_type',
            'utility_service.field.address_toponymy',
            'utility_service.field.address_indoor_number',
            'utility_service.field.estate_unit_usage_type',
            'utility_service.field.estate_unit_cadastral_coordinates',
          ]}
          rows={estateUnits.map((estateUnit) => [
            estateUnit.internalCode,
            estateUnit.name,
            t(`common.enum.estate_unit_type.${estateUnit.type}`),
            parseAddressToString(estateUnit.address, language),
            estateUnit.subNumbering,
            estateUnit.usageType.name,
            parseCadastralCoordinatesToString(estateUnit.currentCadastralUnit?.coordinates),
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
