import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { EstateUnitGroupEstateUnitsTable } from '../../../domains/EstateUnitGroup/EstateUnitsTable/EstateUnitsTable';
import { EstateUnitGroupViewEstateUnitsDialogProps } from './ViewEstateUnits.types';

export const EstateUnitGroupViewEstateUnitsDialog = ({
  estateUnitGroup,
  onClose,
}: EstateUnitGroupViewEstateUnitsDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog fullScreen open title="estate_unit_group.dialog.estate_units.view" onClose={onClose}>
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <EstateUnitGroupEstateUnitsTable estateUnits={estateUnitGroup.estateUnits} />
      </DialogContent>
    </Dialog>
  );
};
