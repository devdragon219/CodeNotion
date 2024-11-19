import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetBillItemTypesQuery } from '../../../../gql/RealGimm.Web.BillItemType.operation';
import { BillItemTypeFieldValue } from '../../../../interfaces/FieldValues/BillIemType';
import { BillItemTypeFieldProps } from './BillItemType.types';

const BillItemTypeField = forwardRef<HTMLDivElement, BillItemTypeFieldProps>(
  ({ disabled, isForContractFee, readonly, ...props }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const debouncedInputValue = useDebounce(inputValue);
    const [loading, setLoading] = useState(false);
    const [queryResults, setQueryResults] = useState<{
      afterRef: string | null | undefined;
      nodes: BillItemTypeFieldValue[];
    }>({
      afterRef: undefined,
      nodes: [],
    });
    const [getQueryState] = useGetBillItemTypesQuery({
      variables: {
        first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
        after: queryResults.afterRef,
        order: {
          description: SortEnumType.Asc,
        },
        where: {
          ...(debouncedInputValue.trim().length && {
            description: {
              contains: debouncedInputValue,
            },
          }),
          ...(isForContractFee && {
            isForContractFee: {
              eq: true,
            },
          }),
        },
      },
      pause: readonly ?? disabled,
    });

    useEffect(() => {
      const nodes =
        getQueryState.data?.billItemType.listBillItemTypes?.nodes?.map((billItemType) => ({
          accountingItemInternalCode: billItemType.defaultAccountingItem?.internalCode ?? '',
          administrationVR: {
            ratePercent: billItemType.administrationVR.ratePercent,
          },
          description: billItemType.description,
          id: billItemType.id,
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
      const { hasNextPage, endCursor } = getQueryState.data?.billItemType.listBillItemTypes?.pageInfo ?? {};
      if (hasNextPage) {
        setQueryResults((results) => ({ ...results, afterRef: endCursor }));
      }
    }, [getQueryState.data?.billItemType.listBillItemTypes?.pageInfo]);

    return (
      <AutocompleteField
        {...props}
        ref={ref}
        options={queryResults.nodes}
        loading={loading}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.description}
        inputValue={inputValue}
        onInputChange={handleInputValueChange}
        onLoadMore={handleLoadMore}
        disabled={disabled}
        readonly={readonly}
      />
    );
  },
);
BillItemTypeField.displayName = 'BillItemTypeField';

export { BillItemTypeField };
