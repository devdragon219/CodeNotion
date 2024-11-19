import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { ForwardedRef, ReactElement, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { OperationResult, useClient } from 'urql';

import { PageInfoFragment } from '../../../../gql/RealGimm.Web.PageInfo.fragment';
import {
  GetAllUsageTypesDocument,
  GetAllUsageTypesQuery,
  GetUsageTypesDocument,
  GetUsageTypesQuery,
} from '../../../../gql/RealGimm.Web.UsageType.operation';
import { UsageTypeFieldValue } from '../../../../interfaces/FieldValues/UsageType';
import { UsageTypeFieldProps } from './UsageType.types';

const UsageTypeField = <Multiple extends boolean | undefined = undefined>(
  { disabled, isFor, readonly, selectAll, ...props }: UsageTypeFieldProps<Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const client = useClient();
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState<{
    nodes: UsageTypeFieldValue[];
    pageInfo?: PageInfoFragment;
  }>({
    nodes: [],
  });
  const variables = useMemo(
    () => ({
      order: [{ ordering: SortEnumType.Asc }, { name: SortEnumType.Asc }],
      where: {
        ...(debouncedInputValue.trim().length && {
          name: {
            contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
          },
        }),
        ...(isFor === 'contracts' && {
          isForContracts: {
            eq: true,
          },
        }),
        ...(isFor === 'estate' && {
          isForEstate: {
            eq: true,
          },
        }),
        ...(isFor === 'estateSubUnit' && {
          isForEstateSubUnit: {
            eq: true,
          },
        }),
        ...(isFor === 'estateUnit' && {
          isForEstateUnit: {
            eq: true,
          },
        }),
      },
    }),
    [debouncedInputValue, isFor],
  );

  const fetchUsageTypes = useCallback(
    async (afterRef?: string | null) => {
      const execute = async () => {
        if (selectAll) {
          const result: OperationResult<GetAllUsageTypesQuery> = await client.query(
            GetAllUsageTypesDocument,
            variables,
          );
          return {
            afterRef: null,
            nodes: result.data?.estateUsageType.listEstateUsageTypesFull,
            pageInfo: undefined,
          };
        } else {
          const result: OperationResult<GetUsageTypesQuery> = await client.query(GetUsageTypesDocument, {
            first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
            after: afterRef,
            ...variables,
          });
          return result.data?.estateUsageType.listEstateUsageTypes;
        }
      };

      setLoading(true);
      const result = await execute();
      const nodes =
        result?.nodes?.map(({ id, internalCode, name }) => ({
          id,
          internalCode,
          name,
        })) ?? [];

      setQueryResults((results) => ({
        ...results,
        nodes: afterRef ? [...results.nodes, ...nodes] : nodes,
        pageInfo: result?.pageInfo,
      }));

      setLoading(false);
    },
    [client, selectAll, variables],
  );

  useEffect(() => {
    if (!disabled && !readonly) {
      fetchUsageTypes();
    }
    // eslint-disable-next-line
  }, [disabled, readonly, variables]);

  const handleInputValueChange = useCallback((_: unknown, value: string, reason: AutocompleteInputChangeReason) => {
    setInputValue(value);
    if (reason !== 'reset') {
      setQueryResults({ nodes: [] });
      setLoading(true);
    }
  }, []);

  const handleLoadMore = useCallback(() => {
    const { hasNextPage, endCursor } = queryResults.pageInfo ?? {};
    if (hasNextPage) {
      fetchUsageTypes(endCursor);
    }
  }, [fetchUsageTypes, queryResults.pageInfo]);

  return (
    <AutocompleteField
      {...props}
      ref={ref}
      options={queryResults.nodes}
      loading={loading}
      selectAll={selectAll}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.name}
      inputValue={inputValue}
      onInputChange={handleInputValueChange}
      onLoadMore={selectAll ? undefined : handleLoadMore}
      disabled={disabled}
      readonly={readonly}
    />
  );
};
UsageTypeField.displayName = 'UsageTypeField';

const ForwardedUsageTypeField = forwardRef(UsageTypeField) as <Multiple extends boolean | undefined = undefined>(
  props: UsageTypeFieldProps<Multiple>,
  ref: ForwardedRef<HTMLDivElement>,
) => ReactElement;

export { ForwardedUsageTypeField as UsageTypeField };
