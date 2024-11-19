import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetCostChargeFilteredCountyNamesQuery } from '../../../../../../gql/RealGimm.Web.CostCharge.operation';
import { CostChargeAnalysisCountyFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';
import { CostChargeAnalysisCountyFieldProps } from './CountyField.types';

const CostChargeAnalysisCountyField = forwardRef<HTMLDivElement, CostChargeAnalysisCountyFieldProps>(
  ({ filters, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: CostChargeAnalysisCountyFilterValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetCostChargeFilteredCountyNamesQuery({
      variables: {
        filters,
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          value: SortEnumType.Asc,
        },
        where: {
          ...(debouncedInputValue.trim().length && {
            value: {
              contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
            },
          }),
        },
      },
    });

    useEffect(() => {
      const nodes = getQueryState.data?.costCharge.filteredCountyNames?.nodes ?? [];

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
      const { hasNextPage, endCursor } = getQueryState.data?.costCharge.filteredCountyNames?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.costCharge.filteredCountyNames?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        getOptionKey={(option) => option.value}
        getOptionLabel={(option) => String(option.value)}
        loading={loading}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
      />
    );
  },
);
CostChargeAnalysisCountyField.displayName = 'CostChargeAnalysisCountyField';

export { CostChargeAnalysisCountyField };
