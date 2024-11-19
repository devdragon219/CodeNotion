import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField, TextField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useGetCadastralCategoriesQuery } from '../../../../../gql/RealGimm.Web.CadastralCategory.operation';
import { CadastralCategoryFieldValue } from '../../../../../interfaces/FieldValues/CadastralCategory';
import { CadastralCategoryFieldProps } from './CadastralCategoryField.types';

export const CadastralCategoryField = ({ control, errors, readonly }: CadastralCategoryFieldProps) => {
  const { t } = useTranslation();
  const address = useWatch({ control, name: 'address' });
  const [categoryInputValue, setCategoryInputValue] = useState('');
  const debouncedCategoryInputValue = useDebounce(categoryInputValue);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{
    afterRef: string | null | undefined;
    nodes: CadastralCategoryFieldValue[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [queryState] = useGetCadastralCategoriesQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: categories.afterRef,
      order: {
        description: SortEnumType.Asc,
      },
      where: {
        ...(address
          ? {
              countryISO: {
                eq: address.countryISO,
              },
            }
          : {}),
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
      queryState.data?.cadastralCategory.listCadastralCategories?.nodes?.map(({ description, externalCode, id }) => ({
        description,
        externalCode,
        id,
      })) ?? [];

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
    const { hasNextPage, endCursor } = queryState.data?.cadastralCategory.listCadastralCategories?.pageInfo ?? {};
    if (hasNextPage) {
      setCategories((categories) => ({ ...categories, afterRef: endCursor }));
    }
  }, [queryState.data?.cadastralCategory.listCadastralCategories?.pageInfo]);

  return (
    <Controller
      name="income.macroCategory"
      control={control}
      render={({ field }) =>
        categories.nodes.length === 0 ? (
          <TextField
            {...field}
            label={t('cadastral_unit.field.income_macro_category')}
            error={!!errors.income?.macroCategory}
            helperText={errors.income?.macroCategory?.message}
            readonly={readonly}
          />
        ) : (
          <AutocompleteField
            {...field}
            label={t('cadastral_unit.field.income_macro_category')}
            options={categories.nodes.map(({ description, externalCode }) =>
              [externalCode, description].filter((it) => !!it).join(' - '),
            )}
            error={!!errors.income?.macroCategory}
            helperText={errors.income?.macroCategory?.message}
            loading={loading}
            inputValue={categoryInputValue}
            onInputChange={handleCategoryInputValueChange}
            onLoadMore={handleLoadMoreCategories}
            readonly={readonly}
          />
        )
      }
    />
  );
};
