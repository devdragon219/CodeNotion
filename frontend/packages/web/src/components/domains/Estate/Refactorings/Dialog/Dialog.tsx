import { CheckCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Dialog, DialogContent, SectionTitle } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { EstateUnitsTable } from '../../../../tables/EstateUnits/EstateUnits';
import { EstateUnitsDialogProps } from './Dialog.types';

export const EstateUnitsDialog = ({ estateUnitIds, onClose }: EstateUnitsDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog fullScreen open onClose={onClose} title="estate.dialog.estate_units.title">
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="estate.dialog.estate_units.description" />
          <Grid2 size={12}>
            <EstateUnitsTable estateUnitIds={estateUnitIds} readonly />
          </Grid2>
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};
