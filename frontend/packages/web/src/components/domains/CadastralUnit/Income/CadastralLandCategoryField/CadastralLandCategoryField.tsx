import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetCadastralLandCategoriesQuery } from '../../../../../gql/RealGimm.Web.CadastralLandCategory.operation';
import { CadastralLandCategoryFormInput } from '../../../../../interfaces/FormInputs/CadastralLandCategory';
import { parseCadastralLandCategoryToCadastralLandCategoryFormInput } from '../../../../../utils/cadastralLandCategory/parseCadastralLandCategoryFragment';
import { CadastralLandCategoryFieldProps } from './CadastralLandCategoryField.types';

export const CadastralLandCategoryField = ({ control, errors, readonly }: CadastralLandCategoryFieldProps) => {
  const { t } = useTranslation();
  const address = useWatch({ control, name: 'address' });
  const [categoryInputValue, setCategoryInputValue] = useState('');
  const debouncedCategoryInputValue = useDebounce(categoryInputValue);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{
    afterRef: string | null | undefined;
    nodes: CadastralLandCategoryFormInput[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [queryState] = useGetCadastralLandCategoriesQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: categories.afterRef,
      order: [{ ordering: SortEnumType.Asc }, { description: SortEnumType.Asc }],
      where: {
        ...(address ? { countryISO: { eq: address.countryISO } } : {}),
        ...(debouncedCategoryInputValue.trim().length
          ? {
              description: {
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
      queryState.data?.cadastralLandCategory.cadastralLandCategories?.nodes?.map(
        parseCadastralLandCategoryToCadastralLandCategoryFormInput,
      ) ?? [];

    setCategories((categories) => ({
      ...categories,
      nodes: categories.afterRef ? [...categories.nodes, ...nodes] : nodes,
    }));

    setLoading(false);
  }, [queryState.data]);

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

  const handleLoadMoreCategories = useCallback(() => {
    const { hasNextPage, endCursor } = queryState.data?.cadastralLandCategory.cadastralLandCategories?.pageInfo ?? {};
    if (hasNextPage) {
      setCategories((categories) => ({ ...categories, afterRef: endCursor }));
    }
  }, [queryState.data?.cadastralLandCategory.cadastralLandCategories?.pageInfo]);

  return (
    <Controller
      name="income.cadastralLandCategory"
      control={control}
      render={({ field }) => (
        <AutocompleteField
          {...field}
          label={t('cadastral_unit.field.income_land_category')}
          options={categories.nodes}
          getOptionLabel={(option) => option.description}
          error={!!errors.income?.cadastralLandCategory}
          helperText={errors.income?.cadastralCategory?.message}
          loading={loading}
          inputValue={categoryInputValue}
          onInputChange={handleCategoryInputValueChange}
          onLoadMore={handleLoadMoreCategories}
          readonly={readonly}
        />
      )}
    />
  );
};
