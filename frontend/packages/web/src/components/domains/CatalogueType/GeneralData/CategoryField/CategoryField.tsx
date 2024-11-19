import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetCatalogueCategoriesQuery } from '../../../../../gql/RealGimm.Web.CatalogueCategory.operation';
import { CatalogueTypeCatalogueCategoryFormInput } from '../../../../../interfaces/FormInputs/CatalogueType';
import { parseCatalogueSubCategoryToCatalogueSubCategoryFormInput } from '../../../../../utils/catalogueCategory/parseCatalogueCategoryFragment';
import { CategoryFieldProps } from './CategoryField.types';

export const CategoryField = ({ control, errors, readonly, onAddCatalogueCategory, setValue }: CategoryFieldProps) => {
  const { t } = useTranslation();
  const subCategory = useWatch({ control, name: 'subCategory' });
  const [categoryInputValue, setCategoryInputValue] = useState('');
  const debouncedCategoryInputValue = useDebounce(categoryInputValue);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{
    afterRef: string | null | undefined;
    nodes: CatalogueTypeCatalogueCategoryFormInput[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [getCatalogueCategoriesState, reexecuteQuery] = useGetCatalogueCategoriesQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: categories.afterRef,
      order: {
        name: SortEnumType.Asc,
      },
      where: {
        ...(debouncedCategoryInputValue.trim().length
          ? {
              name: {
                contains: debouncedCategoryInputValue,
              },
            }
          : {}),
      },
    },
    pause: readonly,
  });

  useEffect(() => {
    const nodes =
      getCatalogueCategoriesState.data?.catalogueCategory.listCatalogueCategories?.nodes?.map(
        ({ id, internalCode, name, subCategories }) => ({
          categoryId: id,
          internalCode,
          name,
          subCategories: subCategories.map(parseCatalogueSubCategoryToCatalogueSubCategoryFormInput),
        }),
      ) ?? [];

    setCategories((categories) => ({
      ...categories,
      nodes: categories.afterRef ? [...categories.nodes, ...nodes] : nodes,
    }));

    setLoading(false);
  }, [getCatalogueCategoriesState.data]);

  const handleCategoryInputValueChange = useCallback(
    (_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
      setCategoryInputValue(value);
      if (reason !== 'reset') {
        setCategories({ afterRef: null, nodes: [] });
        setLoading(true);
      }
    },
    [],
  );

  const handleCategoryChange = useCallback(
    (onChange: (value: CatalogueTypeCatalogueCategoryFormInput | null) => void) =>
      (value: CatalogueTypeCatalogueCategoryFormInput | null) => {
        onChange(value);

        if (!value || !value.subCategories.some(({ subCategoryId }) => subCategoryId === subCategory?.subCategoryId)) {
          setValue('subCategory', null);
        }
      },
    [subCategory, setValue],
  );

  const handleLoadMoreCategories = useCallback(() => {
    const { hasNextPage, endCursor } =
      getCatalogueCategoriesState.data?.catalogueCategory.listCatalogueCategories?.pageInfo ?? {};
    if (hasNextPage) {
      setCategories((categories) => ({ ...categories, afterRef: endCursor }));
    }
  }, [getCatalogueCategoriesState.data?.catalogueCategory.listCatalogueCategories?.pageInfo]);

  const handleAddCatalogueCategory = useCallback(() => {
    onAddCatalogueCategory(() => {
      reexecuteQuery();
    });
  }, [onAddCatalogueCategory, reexecuteQuery]);

  return (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          onChange={handleCategoryChange(field.onChange)}
          label={t('catalogue_type.field.catalogue_type_category')}
          options={categories.nodes}
          error={!!errors.category}
          helperText={errors.category?.message}
          loading={loading}
          getOptionKey={(option) => Number(option.categoryId)}
          getOptionLabel={(option) => option.name}
          inputValue={categoryInputValue}
          onInputChange={handleCategoryInputValueChange}
          onLoadMore={handleLoadMoreCategories}
          action={{
            title: 'catalogue_type.action.add_category',
            onClick: handleAddCatalogueCategory,
          }}
          readonly={readonly}
          required
        />
      )}
    />
  );
};
