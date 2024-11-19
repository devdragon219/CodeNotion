import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { FacilityContractTemplateCatalogueTypesTable } from '../Table/Table';
import { FacilityContractTemplateCatalogueTypesDialogProps } from './Dialog.types';

export const FacilityContractTemplateCatalogueTypesDialog = ({
  catalogueTypes,
  onClose,
}: FacilityContractTemplateCatalogueTypesDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open onClose={onClose} title="facility_contract_template.dialog.view_catalogue_types">
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <FacilityContractTemplateCatalogueTypesTable catalogueTypes={catalogueTypes} />
      </DialogContent>
    </Dialog>
  );
};
