import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetUsersQuery } from '../../../../gql/RealGimm.Web.Admin.operation';
import { UserFieldValue } from '../../../../interfaces/FieldValues/User';
import { parseUserToUserFieldValue } from '../../../../utils/user/parseUserFragment';
import { UserFieldProps } from './User.types';

const UserField = forwardRef<HTMLDivElement, UserFieldProps>(({ disabled, readonly, where, ...props }, ref) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState<{
    afterRef: string | null | undefined;
    nodes: UserFieldValue[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [getQueryState] = useGetUsersQuery({
    variables: {
      first: DEFAULT_AUTOCOMPLETE_FETCH_COUNT,
      after: queryResults.afterRef,
      order: [
        {
          lastName: SortEnumType.Asc,
        },
        {
          firstName: SortEnumType.Asc,
        },
      ],
      where: {
        ...(debouncedInputValue.trim().length && {
          or: [
            {
              firstName: {
                contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
              },
            },
            {
              lastName: {
                contains: debouncedInputValue.replace(/\(.*?\)/, '').trim(),
              },
            },
          ],
        }),
        ...(where ?? {}),
      },
    },
    pause: readonly ?? disabled,
  });

  useEffect(() => {
    const nodes = getQueryState.data?.admin.listUsers?.nodes?.map(parseUserToUserFieldValue) ?? [];

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
    const { hasNextPage, endCursor } = getQueryState.data?.admin.listUsers?.pageInfo ?? {};
    if (hasNextPage) {
      setQueryResults((results) => ({ ...results, afterRef: endCursor }));
    }
  }, [getQueryState.data?.admin.listUsers?.pageInfo]);

  return (
    <AutocompleteField
      {...props}
      ref={ref}
      options={queryResults.nodes}
      loading={loading}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.fullName}
      inputValue={inputValue}
      onInputChange={handleInputValueChange}
      onLoadMore={handleLoadMore}
      disabled={disabled}
      readonly={readonly}
    />
  );
});
UserField.displayName = 'UserField';

export { UserField };
