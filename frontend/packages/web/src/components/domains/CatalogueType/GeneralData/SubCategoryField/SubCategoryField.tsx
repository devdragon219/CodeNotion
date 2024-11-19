import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SubCategoryFieldProps } from './SubCategoryField.types';

export const SubCategoryField = ({ control, errors, readonly, onAddCatalogueSubCategory }: SubCategoryFieldProps) => {
  const { t } = useTranslation();
  const category = useWatch({ control, name: 'category' });
  const subCategories = useMemo(
    () => category?.subCategories.sort((a, b) => (a.name > b.name ? 1 : -1)) ?? [],
    [category],
  );

  const handleAddCatalogueSubCategory = useCallback(() => {
    if (category) {
      onAddCatalogueSubCategory(category);
    }
  }, [category, onAddCatalogueSubCategory]);

  return (
    <Controller
      name="subCategory"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          label={t('catalogue_type.field.catalogue_type_subcategory')}
          options={subCategories}
          error={!!errors.subCategory}
          helperText={errors.subCategory?.message}
          getOptionKey={(option) => Number(option.subCategoryId)}
          getOptionLabel={(option) => option.name}
          action={{
            title: 'catalogue_type.action.add_subcategory',
            onClick: handleAddCatalogueSubCategory,
          }}
          disabled={!category}
          readonly={readonly}
        />
      )}
    />
  );
};
