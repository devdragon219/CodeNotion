import { AutocompleteInputChangeReason } from '@mui/material';
import { AutocompleteField } from '@realgimm5/frontend-common/components';
import { DEFAULT_AUTOCOMPLETE_FETCH_COUNT } from '@realgimm5/frontend-common/configs';
import { SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce } from '@realgimm5/frontend-common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

import { useGetWorkTeamsQuery } from '../../../../gql/RealGimm.Web.WorkTeam.operation';
import { WorkTeamFieldValue } from '../../../../interfaces/FieldValues/WorkTeam';
import { parseWorkerToWorkerFormInput } from '../../../../utils/components/worker/parseWorkerFragment';
import { parseUserToUserFieldValue } from '../../../../utils/user/parseUserFragment';
import { WorkTeamFieldProps } from './WorkTeam.types';

const WorkTeamField = forwardRef<HTMLDivElement, WorkTeamFieldProps>(({ disabled, readonly, where, ...props }, ref) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue);
  const [loading, setLoading] = useState(false);
  const [queryResults, setQueryResults] = useState<{
    afterRef: string | null | undefined;
    nodes: WorkTeamFieldValue[];
  }>({
    afterRef: undefined,
    nodes: [],
  });
  const [getQueryState] = useGetWorkTeamsQuery({
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
        ...(where ?? {}),
      },
    },
    pause: readonly ?? disabled,
  });

  useEffect(() => {
    const nodes =
      getQueryState.data?.workTeam.listWorkTeams?.nodes?.map(({ description, id, leaderUser, workers }) => ({
        description,
        id,
        leaderUser: parseUserToUserFieldValue(leaderUser),
        workers: workers.map(parseWorkerToWorkerFormInput),
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
    const { hasNextPage, endCursor } = getQueryState.data?.workTeam.listWorkTeams?.pageInfo ?? {};
    if (hasNextPage) {
      setQueryResults((results) => ({ ...results, afterRef: endCursor }));
    }
  }, [getQueryState.data?.workTeam.listWorkTeams?.pageInfo]);

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
WorkTeamField.displayName = 'WorkTeamField';

export { WorkTeamField };
