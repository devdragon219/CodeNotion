import { EditTwoTone } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FacilityCatalogueTypeFragment } from '../../../../gql/RealGimm.Web.CatalogueType.fragment';
import { FacilityContractTypeField } from '../../../core/Fields/FacilityContractType/FacilityContractType';
import { FacilityContractTemplateCatalogueTypesTable } from '../CatalogueTypes/Table/Table';
import { CatalogueTypesDialog } from './Dialog/Dialog';
import { FacilityContractTemplateGeneralDataProps } from './GeneralData.types';

export const FacilityContractTemplateGeneralData = ({
  control,
  errors,
  mode,
  readonly,
}: FacilityContractTemplateGeneralDataProps) => {
  const { t } = useTranslation();
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
          onClose={handleCloseCatalogueTypesDialog}
          onSave={handleSaveCatalogueTypes}
        />
      )}
      <SectionTitle value="facility_contract_template.section_title.general_data" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('facility_contract_template.field.internal_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('facility_contract_template.field.description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="facilityContractType"
          control={control}
          render={({ field }) => (
            <FacilityContractTypeField
              {...field}
              label={t('facility_contract_template.field.contract_type')}
              error={!!errors.facilityContractType}
              helperText={errors.facilityContractType?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <>
          <SectionTitle
            actions={
              readonly ? undefined : (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<EditTwoTone />}
                  onClick={handleEditCatalogueTypes}
                >
                  {t('facility_contract_template.action.edit_catalogue_types')}
                </Button>
              )
            }
            value="facility_contract_template.section_title.catalogue_types"
          />
          <Grid2 size={12}>
            <FacilityContractTemplateCatalogueTypesTable catalogueTypes={fields} />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
