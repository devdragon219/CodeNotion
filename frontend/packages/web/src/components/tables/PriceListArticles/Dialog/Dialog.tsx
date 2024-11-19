import { CheckCircleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Dialog, DialogContent, SecondaryTable } from '@realgimm5/frontend-common/components';
import { useTranslation } from 'react-i18next';

import { CatalogueTypesDialogProps } from './Dialog.types';

export const CatalogueTypesDialog = ({ catalogueTypes, onClose }: CatalogueTypesDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog fullScreen open onClose={onClose} title="price_list_article.dialog.view_catalogue_types">
      <DialogContent
        action={
          <Button color="primary" variant="contained" startIcon={<CheckCircleOutline />} onClick={onClose}>
            {t('core.button.close')}
          </Button>
        }
      >
        <SecondaryTable
          columns={[
            'price_list_article.field.catalogue_category',
            'price_list_article.field.catalogue_subcategory',
            'price_list_article.field.catalogue_type',
          ]}
          rows={catalogueTypes.map((entry) => [entry.category.name, entry.subCategory?.name, entry.name])}
        />
      </DialogContent>
    </Dialog>
  );
};
