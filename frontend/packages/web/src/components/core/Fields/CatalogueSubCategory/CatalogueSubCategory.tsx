import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetCatalogueSubCategoriesQuery } from '../../../../gql/RealGimm.Web.CatalogueCategory.operation';
import { CatalogueSubCategoryFormInput } from '../../../../interfaces/FormInputs/CatalogueCategory';
import { parseCatalogueSubCategoryToCatalogueSubCategoryFormInput } from '../../../../utils/catalogueCategory/parseCatalogueCategoryFragment';
import { CatalogueSubCategoryFieldProps } from './CatalogueSubCategory.types';

const CatalogueSubCategoryField = forwardRef<HTMLDivElement, CatalogueSubCategoryFieldProps>(
  ({ catalogueCategoryId, disabled, readonly, where, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: CatalogueSubCategoryFormInput[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetCatalogueSubCategoriesQuery({
      variables: {
        catalogueCategoryId,
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          name: SortEnumType.Asc,
        },
        where: {
          catalogueTypes: {
            any: true,
          },
          ...(debouncedInputValue.trim().length && {
            name: {
              contains: debouncedInputValue,
            },
          }),
          ...(where ?? {}),
        },
      },
      pause: readonly ?? disabled,
    });

    useEffect(() => {
      const nodes =
        getQueryState.data?.catalogueCategory.listCatalogueSubCategories?.nodes?.map(
          parseCatalogueSubCategoryToCatalogueSubCategoryFormInput,
        ) ?? [];

      setQueryResults((results) => ({
        ...results,
        nodes: results.afterRef ? [...results.nodes, ...nodes] : nodes,
      }));

      setLoading(false);
    }, [getQueryState.data]);

    const handleInputValueChange = useCallback((_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
      setInputValue(value);
      if (reason !== 'reset') {
        setQueryResults({ afterRef: null, nodes: [] });
        setLoading(true);
      }
    }, []);

    const handleLoadMore = useCallback(() => {
      const { hasNextPage, endCursor } =
        getQueryState.data?.catalogueCategory.listCatalogueSubCategories?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.catalogueCategory.listCatalogueSubCategories?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        loading={loading}
        getOptionKey={(option) => Number(option.subCategoryId)}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
        readonly={readonly}
        disabled={disabled}
      />
    );
  },
);
CatalogueSubCategoryField.displayName = 'CatalogueSubCategoryField';

export { CatalogueSubCategoryField };
