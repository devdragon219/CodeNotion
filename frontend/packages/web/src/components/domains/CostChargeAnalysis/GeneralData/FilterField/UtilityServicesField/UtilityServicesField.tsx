import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetCostChargeFilteredUtilityServicesQuery } from '../../../../../../gql/RealGimm.Web.CostCharge.operation';
import { CostChargeAnalysisUtilityServiceFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';
import { CostChargeAnalysisUtilityServicesFieldProps } from './UtilityServicesField.types';

const CostChargeAnalysisUtilityServicesField = forwardRef<HTMLDivElement, CostChargeAnalysisUtilityServicesFieldProps>(
  ({ filters, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: CostChargeAnalysisUtilityServiceFilterValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetCostChargeFilteredUtilityServicesQuery({
      variables: {
        filters,
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          utilityContractCode: SortEnumType.Asc,
        },
        where: {
          ...(debouncedInputValue.trim().length && {
            utilityContractCode: {
              contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
            },
          }),
        },
      },
    });

    useEffect(() => {
      const nodes = getQueryState.data?.costCharge.filteredUtilityServices?.nodes ?? [];

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
      const { hasNextPage, endCursor } = getQueryState.data?.costCharge.filteredUtilityServices?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.costCharge.filteredUtilityServices?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        multiple
        options={queryResults.nodes}
        loading={loading}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.utilityContractCode}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
      />
    );
  },
);
CostChargeAnalysisUtilityServicesField.displayName = 'CostChargeAnalysisUtilityServicesField';

export { CostChargeAnalysisUtilityServicesField };
