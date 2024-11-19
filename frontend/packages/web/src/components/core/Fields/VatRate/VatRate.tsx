import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetVatRatesQuery } from '../../../../gql/RealGimm.Web.VatRate.operation';
import { VatRateFieldValue } from '../../../../interfaces/FieldValues/VatRate';
import { VatRateFieldProps } from './VatRate.types';

const VatRateField = forwardRef<HTMLDivElement, VatRateFieldProps>(
  ({ disabled, readonly, vatRateType, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: VatRateFieldValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetVatRatesQuery({
      variables: {
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          description: SortEnumType.Asc,
        },
        where: {
          ...(debouncedInputValue.trim().length && {
            description: {
              contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
            },
          }),
          ...(vatRateType && {
            type: {
              eq: vatRateType,
            },
          }),
        },
      },
      pause: readonly ?? disabled ?? vatRateType === null,
    });

    useEffect(() => {
      setQueryResults({ afterRef: null, nodes: [] });
    }, [vatRateType]);

    useEffect(() => {
      const nodes =
        getQueryState.data?.vatRate.listVATRates?.nodes?.map(({ description, id, internalCode, ratePercent }) => ({
          description,
          id,
          internalCode,
          ratePercent,
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
      const { hasNextPage, endCursor } = getQueryState.data?.vatRate.listVATRates?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.vatRate.listVATRates?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        loading={loading}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => `(${option.internalCode}) ${option.description}`}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
        disabled={disabled}
        readonly={readonly}
      />
    );
  },
);
VatRateField.displayName = 'VatRateField';

export { VatRateField };
