import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { ForwardedRef, ReactElement, forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetCatalogueItemsQuery } from '../../../../gql/RealGimm.Web.CatalogueItem.operation';
import { CatalogueItemFieldValue } from '../../../../interfaces/FieldValues/CatalogueItem';
import { CatalogueItemFieldProps } from './CatalogueItem.types';

const CatalogueItemField = <Multiple extends boolean | undefined = undefined>(
  { disabled, readonly, where, ...props }: CatalogueItemFieldProps<Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState<{
    afterRef: string | null | undefined;
    nodes: CatalogueItemFieldValue[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [getQueryState] = useGetCatalogueItemsQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: queryResults.afterRef,
      order: {
        internalCode: SortEnumType.Asc,
      },
      where: {
        ...(debouncedInputValue.trim().length && {
          internalCode: {
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
      getQueryState.data?.catalogueItem.listCatalogueItems?.nodes?.map(({ catalogueType, id, internalCode }) => ({
        catalogueType,
        id,
        internalCode,
      })) ?? [];

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
    const { hasNextPage, endCursor } = getQueryState.data?.catalogueItem.listCatalogueItems?.pageInfo ?? {};
    if (hasNextPage) {
      setQueryResults((results) => ({ ...results, afterRef: endCursor }));
    }
  }, [getQueryState.data?.catalogueItem.listCatalogueItems?.pageInfo]);

  return (
    <AutocompleteField
      {...props}
      ref={ref}
      options={queryResults.nodes}
      loading={loading}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.internalCode}
      inputValue={inputValue}
      onInputChange={handleInputValueChange}
      onLoadMore={handleLoadMore}
      disabled={disabled}
      readonly={readonly}
    />
  );
};
CatalogueItemField.displayName = 'CatalogueItemField';

const ForwardedCatalogueItemField = forwardRef(CatalogueItemField) as <
  Multiple extends boolean | undefined = undefined,
>(
  props: CatalogueItemFieldProps<Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedCatalogueItemField as CatalogueItemField };
