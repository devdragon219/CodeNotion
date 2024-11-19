import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetCostChargeFilteredAddressesQuery } from '../../../../../../gql/RealGimm.Web.CostCharge.operation';
import { CostChargeAnalysisAddressFilterValue } from '../../../../../../interfaces/FormInputs/CostChargeAnalysis';
import { CostChargeAnalysisToponymyFieldProps } from './ToponymyField.types';

const CostChargeAnalysisToponymyField = forwardRef<HTMLDivElement, CostChargeAnalysisToponymyFieldProps>(
  ({ filters, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: CostChargeAnalysisAddressFilterValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetCostChargeFilteredAddressesQuery({
      variables: {
        filters,
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: [
          {
            toponymy: SortEnumType.Asc,
          },
          {
            numbering: SortEnumType.Asc,
          },
        ],
        where: {
          ...(debouncedInputValue.trim().length && {
            toponymy: {
              contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
            },
          }),
        },
      },
    });

    useEffect(() => {
      const nodes = getQueryState.data?.costCharge.filteredAddresses?.nodes ?? [];

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
      const { hasNextPage, endCursor } = getQueryState.data?.costCharge.filteredAddresses?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.costCharge.filteredAddresses?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => [option.toponymy, option.numbering].filter((it) => !!it).join(', ')}
        loading={loading}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
      />
    );
  },
);
CostChargeAnalysisToponymyField.displayName = 'CostChargeAnalysisToponymyField';

export { CostChargeAnalysisToponymyField };
