import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { ContractLocatedUnitsDialogProps } from './LocatedUnits.types';

export const ContractLocatedUnitsDialog = ({ contract, onClose }: ContractLocatedUnitsDialogProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Dialog fullScreen open title={`contract.tab.estate${contract.isActive ? '_sub_' : '_'}units`} onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            `contract.field.located_unit_estate${contract.isActive ? '_sub_' : '_'}unit_code`,
            'contract.field.located_unit_estate_unit_name',
            'contract.field.located_unit_estate_unit_address',
            'contract.field.located_unit_main_unit',
            'contract.field.located_unit_registry_update',
            'contract.field.located_unit_partial_location',
            'contract.field.located_unit_surface',
          ]}
          rows={contract.locatedUnits.map((locatedUnit) => [
            locatedUnit.estateUnitOrSubUnitInternalCode,
            locatedUnit.estateUnitName,
            parseAddressToString(locatedUnit.estateUnitAddress, language),
            locatedUnit.isMainUnit,
            locatedUnit.isRegistryUpdateEnabled,
            locatedUnit.isPartialLocation,
            locatedUnit.surfaceSqM,
          ])}
        />
      </DialogContent>
    </Dialog>
  );
};
