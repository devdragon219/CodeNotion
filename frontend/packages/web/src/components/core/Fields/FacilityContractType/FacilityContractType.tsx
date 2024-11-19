import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetFacilityContractTypesQuery } from '../../../../gql/RealGimm.Web.FacilityContractType.operation';
import { FacilityContractTypeFieldValue } from '../../../../interfaces/FieldValues/FacilityContractType';
import { FacilityContractTypeFieldProps } from './FacilityContractType.types';

const FacilityContractTypeField = forwardRef<HTMLDivElement, FacilityContractTypeFieldProps>(
  ({ disabled, readonly, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: FacilityContractTypeFieldValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetFacilityContractTypesQuery({
      variables: {
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          name: SortEnumType.Asc,
        },
        where: {
          ...(debouncedInputValue.trim().length && {
            name: {
              contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
            },
          }),
        },
      },
      pause: readonly ?? disabled,
    });

    useEffect(() => {
      const nodes =
        getQueryState.data?.fcltContractType.listFcltContractTypes?.nodes?.map(({ id, name }) => ({
          id,
          name,
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
      const { hasNextPage, endCursor } = getQueryState.data?.fcltContractType.listFcltContractTypes?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.fcltContractType.listFcltContractTypes?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        loading={loading}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
        disabled={disabled}
        readonly={readonly}
      />
    );
  },
);
FacilityContractTypeField.displayName = 'FacilityContractTypeField';

export { FacilityContractTypeField };
