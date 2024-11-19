import { Grid2 } from '@mui/material';
import { SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UsageTypeField } from '../../../core/Fields/UsageType/UsageType';
import { CategoryField } from './CategoryField/CategoryField';
import { CatalogueTypeGeneralDataProps } from './GeneralData.types';
import { SubCategoryField } from './SubCategoryField/SubCategoryField';

export const CatalogueTypeGeneralData = ({
  control,
  errors,
  mode,
  readonly,
  onAddCatalogueCategory,
  onAddCatalogueSubCategory,
  setValue,
}: CatalogueTypeGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="catalogue_type.section_title.general_data" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('catalogue_type.field.catalogue_type_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('catalogue_type.field.catalogue_type')}
              error={!!errors.name}
              helperText={errors.name?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <CategoryField
          control={control}
          errors={errors}
          readonly={readonly}
          onAddCatalogueCategory={onAddCatalogueCategory}
          setValue={setValue}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <SubCategoryField
          control={control}
          errors={errors}
          readonly={readonly}
          onAddCatalogueSubCategory={onAddCatalogueSubCategory}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="usageTypes"
          control={control}
          render={({ field }) => (
            <UsageTypeField
              {...field}
              label={t('catalogue_type.field.catalogue_type_usage_type')}
              selectAll="catalogue_type.action.select_all_usage_types"
              error={!!errors.usageTypes}
              helperText={errors.usageTypes?.message}
              readonly={readonly}
              required
              multiple
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('catalogue_type.field.notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
