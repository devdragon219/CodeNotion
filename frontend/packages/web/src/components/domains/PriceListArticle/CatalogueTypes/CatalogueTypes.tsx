import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PriceListArticleFormInput } from '../../../../interfaces/FormInputs/PriceListArticle';
import { PriceListArticleCatalogueTypesProps } from './CatalogueTypes.types';
import { CatalogueTypesDialog } from './Dialog/Dialog';

export const PriceListArticleCatalogueTypes = ({ control, errors, readonly }: PriceListArticleCatalogueTypesProps) => {
  const { t } = useTranslation();
  const { fields, append, remove } = useFieldArray({ control, name: 'catalogueTypes' });
  const [isCatalogueTypesDialogOpen, setCatalogueTypesDialogOpen] = useState(false);

  const handleOpenCatalogueTypesDialog = useCallback(() => {
    setCatalogueTypesDialogOpen(true);
  }, []);
  const handleCloseCatalogueTypesDialog = useCallback(() => {
    setCatalogueTypesDialogOpen(false);
  }, []);
  const handleSaveCatalogueTypes = useCallback(
    (activities: PriceListArticleFormInput['catalogueTypes']) => {
      append(activities);
      handleCloseCatalogueTypesDialog();
    },
    [append, handleCloseCatalogueTypesDialog],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {isCatalogueTypesDialogOpen && (
        <CatalogueTypesDialog
          catalogueTypes={fields}
          onClose={handleCloseCatalogueTypesDialog}
          onSave={handleSaveCatalogueTypes}
        />
      )}
      <SectionTitle
        actions={
          readonly ? undefined : (
            <Button
              color="secondary"
              variant="contained"
              startIcon={<AddCircleOutline />}
              onClick={handleOpenCatalogueTypesDialog}
            >
              {t('price_list_article.action.add_catalogue_types')}
            </Button>
          )
        }
        value="price_list_article.section_title.catalogue_types"
      />
      {errors.catalogueTypes?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.catalogueTypes.message} />
        </Grid2>
      )}
      <Grid2 size={12}>
        <SecondaryTable
          columns={[
            'price_list_article.field.catalogue_category',
            'price_list_article.field.catalogue_subcategory',
            'price_list_article.field.catalogue_type',
          ]}
          rows={fields.map((entry) => [entry.categoryName, entry.subCategoryName, entry.name])}
          onRowDelete={readonly ? undefined : remove}
        />
      </Grid2>
    </Grid2>
  );
};
