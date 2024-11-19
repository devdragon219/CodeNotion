import { EditTwoTone } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityCatalogueTypeFragment } from '../../../../gql/RealGimm.Web.CatalogueType.fragment';
import { FacilityContractCatalogueTypesProps } from './CatalogueTypes.types';
import { CatalogueTypesDialog } from './Dialog/Dialog';
import { FacilityContractCatalogueTypesField } from './Field/Field';
import { FacilityContractCatalogueTypesTable } from './Table/Table';

export const FacilityContractCatalogueTypes = ({
  control,
  errors,
  mode,
  readonly,
}: FacilityContractCatalogueTypesProps) => {
  const { t } = useTranslation();
  const estateUnits = useWatch({ control, name: 'estateUnits' });
  const [isCatalogueTypesDialogOpen, setCatalogueTypesDialogOpen] = useState(false);
  const { fields, replace } = useFieldArray({
    control,
    name: 'catalogueTypes',
  });

  const handleEditCatalogueTypes = useCallback(() => {
    setCatalogueTypesDialogOpen(true);
  }, []);
  const handleCloseCatalogueTypesDialog = useCallback(() => {
    setCatalogueTypesDialogOpen(false);
  }, []);
  const handleSaveCatalogueTypes = useCallback(
    (catalogueTypes: FacilityCatalogueTypeFragment[]) => {
      replace(catalogueTypes);
      handleCloseCatalogueTypesDialog();
    },
    [replace, handleCloseCatalogueTypesDialog],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {isCatalogueTypesDialogOpen && (
        <CatalogueTypesDialog
          catalogueTypes={fields}
          estateUnits={estateUnits}
          onClose={handleCloseCatalogueTypesDialog}
          onSave={handleSaveCatalogueTypes}
        />
      )}
      <SectionTitle
        actions={
          mode === FormMode.Create || readonly ? undefined : (
            <Button
              color="secondary"
              variant="contained"
              startIcon={<EditTwoTone />}
              onClick={handleEditCatalogueTypes}
            >
              {t('facility_contract.action.edit_catalogue_types')}
            </Button>
          )
        }
        value="facility_contract.section_title.catalogue_types"
      />
      {mode === FormMode.Edit && errors.catalogueTypes?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.catalogueTypes.message} />
        </Grid2>
      )}
      <Grid2 size={12}>
        {mode === FormMode.Create ? (
          <FacilityContractCatalogueTypesField control={control} />
        ) : (
          <FacilityContractCatalogueTypesTable catalogueTypes={fields} />
        )}
      </Grid2>
    </Grid2>
  );
};
