import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetFullCatalogueTypesQuery } from '../../../../gql/RealGimm.Web.CatalogueType.operation';
import { CatalogueTypeFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { parseCatalogueTypeToCatalogueTypeFormInput } from '../../../../utils/catalogueType/parseCatalogueTypeFragment';
import { CatalogueTypeFieldProps } from './CatalogueType.types';

const CatalogueTypeField = forwardRef<HTMLDivElement, CatalogueTypeFieldProps>(
  ({ disabled, readonly, where, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: CatalogueTypeFormInput[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetFullCatalogueTypesQuery({
      variables: {
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          name: SortEnumType.Asc,
        },
        where: {
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
        getQueryState.data?.catalogueType.listCatalogueTypes?.nodes?.map(parseCatalogueTypeToCatalogueTypeFormInput) ??
        [];

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
      const { hasNextPage, endCursor } = getQueryState.data?.catalogueType.listCatalogueTypes?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.catalogueType.listCatalogueTypes?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        loading={loading}
        getOptionKey={(option) => Number(option.catalogueTypeId)}
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
CatalogueTypeField.displayName = 'CatalogueTypeField';

export { CatalogueTypeField };
