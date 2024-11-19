import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetTicketTypesQuery } from '../../../../gql/RealGimm.Web.TicketType.operation';
import { TicketTypeFieldValue } from '../../../../interfaces/FieldValues/TicketType';
import { TicketTypeFieldProps } from './TicketType.types';

const TicketTypeField = forwardRef<HTMLDivElement, TicketTypeFieldProps>(({ disabled, readonly, ...props }, ref) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState<{
    afterRef: string | null | undefined;
    nodes: TicketTypeFieldValue[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [getQueryState] = useGetTicketTypesQuery({
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
      },
    },
    pause: readonly ?? disabled,
  });

  useEffect(() => {
    const nodes =
      getQueryState.data?.ticketType.listTicketTypes?.nodes?.map(({ description, id }) => ({
        description,
        id,
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
    const { hasNextPage, endCursor } = getQueryState.data?.ticketType.listTicketTypes?.pageInfo ?? {};
    if (hasNextPage) {
      setQueryResults((results) => ({ ...results, afterRef: endCursor }));
    }
  }, [getQueryState.data?.ticketType.listTicketTypes?.pageInfo]);

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
});
TicketTypeField.displayName = 'TicketTypeField';

export { TicketTypeField };
