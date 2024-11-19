import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetCostChargeFilteredEstatesQuery } from '../../../../../../gql/RealGimm.Web.CostCharge.operation';
import { CostChargeAnalysisEstateFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';
import { CostChargeAnalysisEstatesFieldProps } from './EstatesField.types';

const CostChargeAnalysisEstatesField = forwardRef<HTMLDivElement, CostChargeAnalysisEstatesFieldProps>(
  ({ filters, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: CostChargeAnalysisEstateFilterValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetCostChargeFilteredEstatesQuery({
      variables: {
        filters,
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          internalCode: SortEnumType.Asc,
        },
        where: {
          ...(debouncedInputValue.trim().length && {
            internalCode: {
              contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
            },
          }),
        },
      },
    });

    useEffect(() => {
      const nodes = getQueryState.data?.costCharge.filteredEstates?.nodes ?? [];

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
      const { hasNextPage, endCursor } = getQueryState.data?.costCharge.filteredEstates?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.costCharge.filteredEstates?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        multiple
        options={queryResults.nodes}
        loading={loading}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.internalCode}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
      />
    );
  },
);
CostChargeAnalysisEstatesField.displayName = 'CostChargeAnalysisEstatesField';

export { CostChargeAnalysisEstatesField };
