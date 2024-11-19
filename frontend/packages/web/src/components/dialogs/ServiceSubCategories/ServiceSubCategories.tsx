import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { ServiceSubCategorieDialogProps } from './ServiceSubCategories.types';

export const ServiceSubCategorieDialog = ({ subCategories, onClose }: ServiceSubCategorieDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog fullScreen open onClose={onClose} title="service_category.dialog.sub_category.view">
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={['service_category.field.internal_code', 'service_category.field.name']}
          rows={subCategories.map((entry) => [entry.internalCode, entry.name])}
        />
      </DialogContent>
    </Dialog>
  );
};
