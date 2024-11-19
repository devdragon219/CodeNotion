import { Grid2 } from '@mui/material';
import { SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EstateStatus } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  CatalogueCategoryFormInput,
  CatalogueSubCategoryFormInput,
} from '../../../../interfaces/FormInputs/CatalogueCategory';
import { CatalogueItemFormInput } from '../../../../interfaces/FormInputs/CatalogueItem';
import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { getEmptyCatalogueItemFormInput } from '../../../../utils/catalogueItem/initialValues';
import { CatalogueCategoryField } from '../../../core/Fields/CatalogueCategory/CatalogueCategory';
import { CatalogueSubCategoryField } from '../../../core/Fields/CatalogueSubCategory/CatalogueSubCategory';
import { CatalogueTypeField } from '../../../core/Fields/CatalogueType/CatalogueType';
import { CatalogueGeneralDataProps } from './GeneralData.types';

export const CatalogueGeneralData = ({ control, errors, mode, readonly, setValue }: CatalogueGeneralDataProps) => {
  const { t } = useTranslation();
  const category = useWatch({ control, name: 'category' });
  const subCategory = useWatch({ control, name: 'subCategory' });
  const estate = useWatch({ control, name: 'estate' });

  const handleCategoryChange = useCallback(
    (onChange: (value: CatalogueCategoryFormInput | null) => void) => (value: CatalogueCategoryFormInput | null) => {
      onChange(value);

      setValue('subCategory', null);
      setValue('catalogueType', null);
      setValue('items', [] as CatalogueItemFormInput[]);
    },
    [setValue],
  );

  const handleSubCategoryChange = useCallback(
    (onChange: (value: CatalogueSubCategoryFormInput | null) => void) =>
      (value: CatalogueSubCategoryFormInput | null) => {
        onChange(value);

        setValue('catalogueType', null);
        setValue('items', [] as CatalogueItemFormInput[]);
      },
    [setValue],
  );

  const handleTypeChange = useCallback(
    (onChange: (value: CatalogueTypeFormInput | null) => void) => (value: CatalogueTypeFormInput | null) => {
      onChange(value);

      const newValue: CatalogueItemFormInput[] =
        value && mode === FormMode.Create
          ? [getEmptyCatalogueItemFormInput(value, estate, EstateStatus.Operational)]
          : [];
      setValue('items', newValue);
    },
    [estate, mode, setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="catalogue.section_title.general_data" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <CatalogueCategoryField
              {...field}
              onChange={handleCategoryChange(field.onChange)}
              label={t('catalogue.field.catalogue_category')}
              error={!!errors.category}
              helperText={errors.category?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="subCategory"
          control={control}
          render={({ field }) => (
            <CatalogueSubCategoryField
              {...field}
              onChange={handleSubCategoryChange(field.onChange)}
              label={t('catalogue.field.catalogue_subcategory')}
              catalogueCategoryId={category?.categoryId}
              error={!!errors.subCategory}
              helperText={errors.subCategory?.message}
              disabled={!category || category.subCategories.length === 0}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="catalogueType"
          control={control}
          render={({ field }) => (
            <CatalogueTypeField
              {...field}
              onChange={handleTypeChange(field.onChange)}
              label={t('catalogue.field.catalogue_type')}
              error={!!errors.catalogueType}
              helperText={errors.catalogueType?.message}
              disabled={!category || category.catalogueTypes.length === 0}
              readonly={readonly}
              required
              where={{
                category: {
                  id: {
                    eq: category?.categoryId,
                  },
                },
                subCategory: {
                  id: {
                    eq: subCategory?.subCategoryId,
                  },
                },
              }}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
